const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLEnumType = require('graphql').GraphQLEnumType;
//const GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
//const GraphQLNull = require('graphql').GraphQLNull;
//const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
//const GraphQLInt = require('graphql').GraphQLInt;
//const GraphQLFloat = require('graphql').GraphQLFloat;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const GraphQLDate = require('graphql-date');
const UserModel = require('../models/User');
const PictureModel = require('../models/Picture');
const EventModel = require('../models/Event');
const AlertModel = require('../models/Alert');
const bcrypt = require('bcrypt');
const s3 = require('../services/uploads').s3;

require('dotenv').config();

const userType = new GraphQLObjectType({
    name: "userType",
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            username: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            },
            resetPasswordToken: {
                type: GraphQLString
            },
            resetPasswordExpires: {
                type: GraphQLDate
            }
        }
    }
});

const pictureType = new GraphQLObjectType({
    name: "pictureType",
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            key: {
                type: GraphQLString
            },
            url: {
                type: GraphQLString
            },
            isSchedule: {
                type: GraphQLBoolean
            },
            lastModifiedBy: {
                type: GraphQLString
            }
        }
    }
});

const eventType = new GraphQLObjectType({
    name: "eventType",
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            instructors: {
                type: GraphQLList(GraphQLString)
            },
            lastModifiedBy: {
                type: GraphQLString
            }
        }
    }
});

const alertType = new GraphQLObjectType({
    name: "alertType",
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            message: {
                type: GraphQLString
            },
            isActive: {
                type: GraphQLBoolean
            },
            isEmergency: {
                type: GraphQLBoolean
            },
            lastModifiedBy: {
                type: GraphQLString
            }
        }
    }
});

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: function () {
        return {
            getUserByToken: {
                type: userType,
                args: {
                    resetPasswordToken : {
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const user = UserModel.findOne({ resetPasswordToken: params.resetPasswordToken }).exec();
                    if (!user){
                        return null;
                    }
                    return user;
                }
            },
            getAllSlides: {
                type: new GraphQLList(pictureType),
                resolve: function () {
                    const slides = PictureModel.find({ isSchedule: false }).exec();
                    if (!slides){
                        return null;
                    }
                    return slides;
                }
            },
            getSchedule: {
                type: pictureType,
                resolve: function () {
                    const schedule = PictureModel.findOne({ isSchedule: true }).exec();
                    if (!schedule){
                        return null;
                    }
                    return schedule;
                }
            },
            getAllEvents: {
                type: new GraphQLList(eventType),
                resolve: function () {
                    const events = EventModel.find().exec();
                    if (!events){
                        return null;
                    }
                    return events;
                }
            },
            getAllAlerts: {
                type: new GraphQLList(alertType),
                resolve: function () {
                    const alerts = AlertModel.find().exec();
                    if (!alerts){
                        return null;
                    }
                    return alerts;
                }
            },
            getActiveAlerts: {
                type: new GraphQLList(alertType),
                resolve: function () {
                    const alerts = AlertModel.find({ isActive: true }).exec();
                    if (!alerts){
                        return null;
                    }
                    return alerts;
                }
            },
        }
    }
});

const mutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: function () {
        return {
            changeUserPassword: {
                type: userType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    password: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    let user = UserModel.findById(params.id).exec();
                    if (!user){
                        throw new Error("Could not find User");
                    }
                    if (!user.resetPasswordToken || user.resetPasswordExpires < Date.now()){
                        throw new Error("Cannot change this User's password");
                    }
                    let pass = params.password;
                    bcrypt.hash(pass, 10, (err, hashedPassword) => {
                        if (err){
                            throw new Error("Hash Error");
                        }
                        user.updateOne({ password: hashedPassword }, (err) => {
                            if (err){
                                throw new Error("Update Error")
                            }
                        });
                        return user;
                    });
                }
            },
            removeSlide: {
                type: pictureType,
                args: {
                    key: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    PictureModel.findOneAndRemove({key: params.key}, (err, removedSlide) => {
                        if (err) {
                            throw new Error("Could not delete slide from database");
                        }
                        if (removedSlide) {
                            s3.deleteObject({Bucket: process.env.S3_BUCKET_NAME, Key: removedSlide.key}, (err, data) => {
                                if (err)
                                    throw new Error("Could not delete slide from cloud");
                            });
                        }
                        return removedSlide;
                    });
                }
            },
            removeSchedule: {
                type: pictureType,
                resolve: function (root, params) {
                    PictureModel.findOneAndRemove({isSchedule: true}, (err, removedSchedule) => {
                        if (err) {
                            throw new Error("Could not delete schedule from database");
                        }
                        if (removedSchedule) {
                            s3.deleteObject({Bucket: process.env.S3_BUCKET_NAME, Key: removedSchedule.key}, (err, data) => {
                                if (err)
                                    throw new Error("Could not delete schedule from cloud");
                            });
                        }
                        return removedSchedule;
                    });
                }
            },
            addEvent: {
                type: eventType,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    instructors: {
                        type: new GraphQLList(GraphQLString)
                    },
                    lastModifiedBy: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    const eventModel = new EventModel(params);
                    const newEvent = eventModel.save();
                    if (!newEvent) {
                        throw new Error("Could not save Event");
                    }
                    return newEvent;
                }
            },
            updateEvent: {
                type: eventType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    instructors: {
                        type: new GraphQLList(GraphQLString)
                    },
                    lastModifiedBy: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    return EventModel.findByIdAndUpdate(params.id, {
                        name: params.name,
                        description: params.description,
                        times: params.times,
                        lastModifiedBy: params.lastModifiedBy
                    }, (err) => {
                        if (err)
                            throw new Error('Could not update Event');
                    });
                }
            },
            removeEvent: {
                type: eventType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    const removedEvent = EventModel.findByIdAndRemove(params.id).exec();
                    if (!removedEvent) {
                        throw new Error("Could not remove Event");
                    }
                    return removedEvent;
                }
            },
            addAlert: {
                type: alertType,
                args: {
                    message: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    isActive: {
                        type: new GraphQLNonNull(GraphQLBoolean)
                    },
                    isEmergency: {
                        type: new GraphQLNonNull(GraphQLBoolean)
                    },
                    lastModifiedBy: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    const alertModel = new AlertModel(params);
                    const newAlert = alertModel.save();
                    if (!newAlert) {
                        throw new Error("Could not save Alert");
                    }
                    return newAlert;
                }
            },
            updateAlert: {
                type: alertType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    message: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    isActive: {
                        type: new GraphQLNonNull(GraphQLBoolean)
                    },
                    isEmergency: {
                        type: new GraphQLNonNull(GraphQLBoolean)
                    },
                    lastModifiedBy: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    return AlertModel.findByIdAndUpdate(params.id, {
                        message: params.message,
                        isActive: params.isActive,
                        lastModifiedBy: params.lastModifiedBy
                    }, (err) => {
                        if (err)
                            throw new Error('Could not update Alert');
                    });
                }
            },
            removeAlert: {
                type: alertType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    const removedAlert = AlertModel.findByIdAndRemove(params.id).exec();
                    if (!removedAlert) {
                        throw new Error("Could not remove Alert");
                    }
                    return removedAlert;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutationType });
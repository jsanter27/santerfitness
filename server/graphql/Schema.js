const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
//const GraphQLEnumType = require('graphql').GraphQLEnumType;
//const GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
//const GraphQLNonNull = require('graphql').GraphQLNonNull;
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

module.exports = new GraphQLSchema({ query: queryType });
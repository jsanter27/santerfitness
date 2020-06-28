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
const PictureModel = require('../models/Picture');
const EventModel = require('../models/Event');
const AlertModel = require('../models/Alert');
const NotificationModel = require('../models/Notification');

require('dotenv').config();

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

const notificationType = new GraphQLObjectType({
    name: "notificationType",
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            number: {
                type: GraphQLString
            }
        }
    }
});

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: function () {
        return {
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
            getNotificationList: {
                type: new GraphQLList(notificationType),
                resolve: function () {
                    const notifs = NotificationModel.find().exec();
                    if (!notifs){
                        return null;
                    }
                    else {
                        return notifs;
                    }
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType });
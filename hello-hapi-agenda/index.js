'use strict';
const mongoose = require('mongoose');
const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const { request } = require('http');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
mongoose.connect('mongodb://localhost:27017/CRUD_App', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected....'))
    .catch(err => console.log(err));

const UserModel = mongoose.model("user",{
    username: String,
    password: String
});

const init = async () => {
    const server = new Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    //swagger
    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                version: Pack.version,
            },
    };
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    //API user CRUD
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });
    server.route({
        method: "POST",
        path: "/api/user",
        options: {
            description: 'Add a user ',
            notes: 'Add new user',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }),
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                }
            }
        },
        handler: async (request, h) => {
            try {
                var user = new UserModel(request.payload);
                var result = await user.save();
                return h.response(result);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });
    server.route({
        method: "GET",
        path: "/api/users",
        options: {
            description: 'Get users list',
            notes: 'Returns an array of users',
            tags: ['api'],
            handler: async (request, h) => {
                try {
                    var user = await UserModel.find().exec();
                    return h.response(user);
                } catch (error) {
                    return h.response(error).code(500);
                }
            }
        }
    });
    server.route({
        method: "GET",
        path: "/api/user/{id}",
        options: {
            description: 'Get user with an id',
            notes: 'Returns user by id',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id : Joi.string()
                            .required()
                            .description('the id for the user item'),
                })
            },
            handler: async (request, h) => {
                try {
                    var user = await UserModel.findById(request.params.id).exec();
                    return h.response(user);
                } catch (error) {
                    return h.response(error).code(500);
                }
            }
        }
    });
    server.route({
        method: "PUT",
        path: "/api/user/{id}",
        options: {
            description: 'Edit a user ',
            notes: 'Edit a user',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                params: Joi.object({
                    id : Joi.string()
                            .required()
                            .description('the id for find a the user '),
                }),
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }),
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                }
            }
        },
        handler: async (request, h) => {
            try {
                var result = await UserModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
                return h.response(result);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });
    server.route({
        method: "DELETE",
        path: "/api/user/{id}",
        options: {
            description: 'Delete user with an id',
            notes: 'Delete user with an id',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id : Joi.string()
                            .required()
                            .description('the id for the user want to delete'),
                })
            },
        },
        handler: async (request, h) => {
            try {
                var result = await UserModel.findByIdAndDelete(request.params.id);
                return h.response(result);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });


    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }

    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });
    
};

init();
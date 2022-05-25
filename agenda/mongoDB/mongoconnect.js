var mongoose = require('mongoose');
var express = require('express');
var app = express();
var secret = require('../secret.js')

const mongoconnect = { 
    connectDB: async function() {
    switch(app.get('env')){
        case 'development':
            await mongoose.connect(secret.mongo.dev.conn, { keepAlive: true, keepAliveInitialDelay: 300000 }).then(()=>
            {
                console.log('Database connected - Dev');
            });
            break;
        case 'production':
            await mongoose.connect(secret.mongo.product.conn, { keepAlive: true, keepAliveInitialDelay: 300000 }).then(()=>
            {
                console.log('Database connected - Product');
            });;
            break;
        default:
            throw new Error('Unknow execution environment: ' + app.get('env'));   
    }
}}
module.exports = mongoconnect

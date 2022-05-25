const Agenda = require('agenda');
var createError = require('http-errors');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/Agenda';
async function run() {
    await mongoose.connect(connectionString, { keepAlive: true, keepAliveInitialDelay: 300000 }).then(()=>
    {
        console.log('Database connected');
        console.log(mongoose.connection.readyState);
    });

    const agenda = new Agenda({
        db: {address: connectionString, collection: 'Agenda'}});
    agenda.define("check connection", async (job,done) => {
        // mongoose.connection.readyState = 1  or 2 is connected
        if(mongoose.connection.readyState==1 ||mongoose.connection.readyState==2  ){
            console.log('connection is good');
            done()
        }
        else{
            console.log('dont have connection');
            done()
        }
        });
    await agenda.start();
    await agenda.every("1 minutes", "check connection");    
    

    

}
run()
const port = 8080
app.listen(port, () => console.log(
    
  `Express started on http://localhost:${port}; ` +
  
  `press Ctrl-C to terminate. `))
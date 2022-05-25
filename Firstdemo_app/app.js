var createError = require('http-errors');
var express = require('express');
var app = express();
// view engine setup


app.use(express.json());

app.use(express.urlencoded({ extended: false }));

var mongoconnect = require('./mongoDB/mongoconnect');

mongoconnect.connectDB();
// catch 404 and forward to error handler


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const port = 8080
app.listen(port, () => console.log(
    
  `Express started on http://localhost:${port}; ` +
  
  `press Ctrl-C to terminate. `))
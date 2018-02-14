const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socket_io = require('socket.io')(http);
var route = require('./route.js');
const bodyParser = require('body-parser');
const file_upload = require('express-fileupload');
var form_handle = require('./form_handle.js');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.use(file_upload());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/style', express.static('style')); // open folder for css and js file
app.use('/', express.static('home')); // for index.html home page
app.use('/profile_pic', express.static('profile_pic')) // for accessing the profile pic. of user
//app.use('/chat', app.static('views')); // for accessing public or private chat page

form_handle.login_signup(app); // handles form data login form or sign up form
route.route(app); // router for sending static page

socket_io.on('connection', function(client_sock) {
    console.log('new client connected');
    client_sock.emit('from_server', 'hello new client');
});

var about = socket_io.of('/about.html');

    about.emit('ab', 'hiiii');

// listen to localhost on port 3000
http.listen(server_port, server_ip_address, function() {
    console.log('server running on port : 8080');
});

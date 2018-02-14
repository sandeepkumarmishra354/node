// delevers static pages
function route(app)
{
    // delever home page index.html
    app.get('/', function(req, res) {
        res.sendFile('index.html');
    });
    
    // folder protection
    // no one can access the folder
    app.get('/profile_pic', function(req, res) {
        res.redirect('/');
        //res.send('you are not permitted to access this folder');
    });
    
    app.get('/chat/public', function(req, res) {
        console.log('alax');
        res.sendFile('/root/Desktop/node/views/public_chat.html');
    });
    
}

exports.route = route;
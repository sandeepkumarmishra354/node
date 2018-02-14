var fs = require('fs');

// request handler for form data login form or sign up form

function login_signup(app)
{
    
    app.set('view engine', 'pug'); // initialize the pug (jade) engine for rendering the html
    app.set('views', './views');  // sets the path for pug engine to find .pug file and render them
    var userPath = 'form data/';  // folder from where reading and writing is possible

    
    /* post request for sign up when the user try to sign up.
     * this function collects the information about user from the form.
     * And save the information in file for further use
    */
    app.post('/sign_up', function(req, res) {
        
        if(!req.files) // if there is no file selected by user
            res.send('ERROR: <h2 style="color:red">no file selected</h2>');
        
        else
        {
            var tmp_detail = req.body; // parse the all info. provided by user
            var sig = true; // an indicator for new and registerd email matching
            var profile_pic = req.files.profile_pic; // name of the uploaded file
            if(!profile_pic) // if there is no file selected by user
                res.send('ERROR: <h2 style="color:red">no file selected</h2>');

            else
            {
                // open file 'user_email.json' for matching the email provided by user during sign up
                // if email is already registerd then take the appropriate action...
                fs.readFile('all username/user_email.json', function(err, data) {
                    if(err)
                        console.log('user_email.json file reading fail...');
                    else
                    {
                        var x, user_email = JSON.parse(data); // parse the json file data into JavaScript object
                        var l = user_email.emails.length; // length of array inside json file
                        for(var i=0; i<l; i++)
                        {
                            /* checking already registerd and new email
                             * for registering 
                            */
                            if(user_email.emails[i] == tmp_detail.email) 
                            {
                                sig = false; // means match found
                                console.log('hello here');
                                res.send('ERROR:'+tmp_detail.email+'<h2 style="color:blue"> already registerd</h2>')
                                break;
                            }
                        }
                        
                        if(sig == true) // if 'sig == true' it means no match found
                        {
                            user_email.emails.push(tmp_detail.email); // append the new email into the file
                            user_email = JSON.stringify(user_email); // convert back into json for saving the file
                            // this function saves the file
                            fs.writeFile('all username/user_email.json', user_email, function(err) {
                                if(err)
                                    console.log('new file saving fail...');
                                else
                                    console.log('new file saved with new email '+tmp_detail.email);
                            });
                            
                            // move the file in folder 'form data' and change the file name to user's email address
                            profile_pic.mv('profile_pic/'+tmp_detail.email+'.jpg', function(err) {
            
                                if(err) throw 'file not uploaded';
                                else
                                    console.log('file uploaded');
                                });
                            
                            // if all of above are correct then these lines are excuted
                            console.log('form data post method');
                            var det = req.body; // parse the all info. provided by user
                
                            /* add the profile_pic(key) and corresponding user's email as value in json file.
                            * for extracting the user's pic. detail during login
                            */
                            det.profile_pic = det.email+'.jpg';
                            var fileName = det.email+'.json'; // set file name as user's email address
                            fileName = userPath+fileName; // set the path and file name
                            delete det.pswrd2;
                            var tmp = JSON.stringify(det); // convert the info. in json
                            fs.writeFile(fileName, tmp, function(err) { // save the user's detail
                                if(err)
                                    console.log('file not saved');
                                else
                                    console.log(fileName+' saved !!');
                            });
                            
                            // render the file user_login.pug and sets the value provided by user and send the html file to the user
                            res.render('user_login', {userName:det.fname+' '+det.lname, 
                                                      fullName:det.fname+' '+det.lname,
                                                      profile_pic:'/profile_pic/'+det.profile_pic
                                                     }
                          
                                        );
                        }
                    }
                });
        
                
            } 
        
        }
        
    });
        
    /* post request for login, this function invokes when user clicks on login button
     * collect the login information and open user's saved file and match the login details
    */
    app.post('/log_in', function(req, res) {
        
        var det = req.body; // parse the all info. provided by user
        
        // if user not enter the user name or password but click the login button
        if(det.usrnme == '' || det.pswrd == '')
            res.send('ERROR: <h2 style="color:red">please enter a valid user name and password</h2>');
        
        else  {
            
        var fileName = det.usrnme+'.json'; // set the file name
        fileName = userPath+fileName; // set the path and file name
        
        // read the file
        fs.readFile(fileName, function(err, data) {
            
            if(err)
                res.send('Please enter a valid user name and password. You don\'t have an account ? Just go back and sign up');
            
            else  {
                
            data = JSON.parse(data); // parse the json file into JavaScript object
            
            
            // match the user name and password provided by user
            if(det.usrnme == data.email && det.pswrd == data.pswrd1)
            {
                console.log('thanku for login..');
                // render the file user_login.pug and set the values and send it to user
                res.render('user_login', 
                          
                           {userName:data.fname+' '+data.lname, 
                            fullName:data.fname+' '+data.lname,
                            profile_pic:'/profile_pic/'+data.profile_pic
                           }
                          
                          );
            }
                // it means user enter wrong user name or password
            else  {
                console.log('user name or password incorrect');
                res.send('ERROR: <h2 style="color:red">user name or password incorrect</h2>');  }
                
            }
            
        });
            
        }
    });
        
}

exports.login_signup = login_signup;
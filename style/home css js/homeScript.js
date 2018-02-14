$(document).ready(function() {
    
        $('#tmp_signup').click(function() {
            $('.signup_form').show(700);
            $(this).hide(400);
            $('.login_form').hide(700);
            $('#tmp_login_btn').show(700);
        });
    
        $('#tmp_login').click(function() {
            $('.signup_form').hide(700);
            $('#tmp_login_btn').hide(700);
            $('.login_form').show(700);
            $('#tmp_signup').show(600);
        });   
});

// sign up form varification on client side
function check_signup()
{
    var formValue = document.getElementsByClassName('sgn'); // get all form values
    
    // check first name, last name and email
    if( formValue[0].value == '' || formValue[1].value == '' || formValue[2].value == '' )
    {
        alert('all fields are important\n fill them...');
        return false;
    }
    // check that password_1 and password_2 both are 6 character long or not
    if( formValue[4].value.length<6 || formValue[5].value.length<6)
    {
        alert('password should be minimum 6 characters long');
        return false;
    }
    
    // match the password_1 and password_2
    if( formValue[4].value != formValue[5].value )
    {
        alert('enter the same password');
        return false;
    }
    
    // check that phone No. length should be minimum 10 digits long
    if(formValue[3].value.length<10)
    {
        alert('phone number should be minimum 10 digit long');
        return false;
    }
}

// login form varification
function check_login()
{
    var formValue = document.getElementsByClassName('lgn'); // get the value of password
    // check that password should be minimum 6 characters long
    if( formValue[1].value.length < 6 )
    {
        alert('password should be minimum 6 characters long');
        return false;
    }
}

// send public chat msg
function send_msg()
{
    
}

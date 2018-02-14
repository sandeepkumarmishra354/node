function private_chat()
{
    
}

function public_chat()
{
    $('#public_box').show();
    $('#public_box').load('/chat/public');
}

function send_msg()
{
    var txt = $('#msg').val();
    if(txt == '')
        return false;
    $('#msg').val('');
    var msg = $('<p class="sent_msg"> </p>').text(txt);
    $('#option_box').before(msg);
    return false;
}

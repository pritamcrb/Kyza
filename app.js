var local = {};
local.avatar = "images/user.png";

var remote = {};
remote.avatar = "images/kyza_bot.jpg";


var accessToken = "0e00fcc3a47a41a18b23fbb6adf4585a";
var baseUrl = "https://api.api.ai/v1/";

function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            

function insertChat(who, text){
    var control = "";
    var date = formatTime(new Date());
    
     if (who == "local"){
        
         control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p id="dates"><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 0px !important;float: right !important;width: 75px;margin: 0px 0px 0px 134px;"><img class="img-circle" style="width:100%;" src="'+local.avatar+'" /></div>' +                                
                  '</li>';                   
    }else{
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width: 80px;padding: 5px;" src="'+ remote.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p id="dates"><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';   
    }
    $("#messages").append(control);
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function resetChat(){
    $("#messages").empty();
}

$(".mytext").on("keyup", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            insertChat("local", text);              
            $(this).val('');
            queryBot(text)
        }
    }
});

resetChat();


function queryBot(text) {
            $.ajax({
                type: "POST",
                url: baseUrl + "query?v=20150910",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    "Authorization": "Bearer " + accessToken
                },
                data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
                success: function(data) {
                    insertChat("remote",data.result.fulfillment.speech);
                },
                error: function() {
                    insertChat("remote","Internal Server Error");
                }
            });
    }

if($(window).width() <= 500){
  $("#chat-panel").on('click',function(){
    $(".innerframe").toggle();
});
}

/**
 * Created by pwwpche on 2015/5/29.
 */
function hintError(str) {
    $("#mainContainer").prepend($("<div>")
        .attr("class", "alert alert-error")
        .html('<button type="button" class="close" ' +
        'data-dismiss="alert">×</button><i class="icon-remove">' +
        '</i>  ' + str))
        .show();
}

function hintSuccess(str) {
    $("#mainContainer").prepend($("<div>")
        .attr("class", "alert alert-success")
        .html('<button type="button" class="close" ' +
        'data-dismiss="alert">×</button><i class="icon-ok">' +
        '</i>  ' + str))
        .show();
}

function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return (document.cookie.substring(c_start,c_end));
        }
    }
    return ""
}

function setCookie(c_name,value,expiredays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getMarketDepth()
{
    var depth = getCookie("depth");
    if($.isNumeric(depth) == false){
        depth = 5;
    }
    return parseInt(depth, 10);
}


function getItemsPerPage(){
    var items = getCookie("itemsPerPage");
    if($.isNumeric(items) == false){
        items = 5;
    }
    return parseInt(items, 10);
}


function setUsernameLabel(){
    var username = getCookie("username");
	window.setInterval(heartBeat, 10000);
	
    if(username === ""){
        username = "Please log in";
        //window.location.href = "index.html";
    }
    $("#userNameArea").html('<i class="icon-user"></i>' + username + '<b class="caret"></b>')
    $("a:contains(Logout)").click(function(){
        setCookie("username", "");
        $.ajax({
            type : "POST",
            url : "http://localhost:8080/logout",
            dataType: "json",
            data : {
                username : username
            },
            success : function(msg) {},
            error : function(){}
        });
        window.location.href = "index.html";
    });
}

function heartBeat(){
    var username = getCookie("username");
	$.ajax({
        type : "POST",
        url : "http://localhost:8080/heartBeat",
        dataType: "json",
        data : {
            username : username
        },
        success : function(msg) {},
        error : function(){}
		
	});
}
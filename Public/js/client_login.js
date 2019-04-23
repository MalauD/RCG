$(document).ready(function(){
    $("#RegisterButton").click(()=>{
        ResetError();
        FMail=$("#email").val(),
        Password = $("#lpassword").val();
        params = {
            'Mail':FMail,
            'Password':Password
        };
        $.ajax({
            url:'/Login' ,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(params),
            success: function (data){
                console.log('Login OK')
                $(location).attr('href', '/')
            },
            error: function(xhr, status){
                if(xhr.status == 500)
                    DisplayErrors(xhr.responseJSON);
            }
        });
    });
});

function DisplayErrors(err){
    if(err.param == 'Mail'){
        $("#email").css("border-bottom","2px solid red");
        $("#Emaill").text($("#Emaill").text() + " " + err.err)
    }
    if(err.param == 'Password'){
        $("#lpassword").css("border-bottom","2px solid red");
        $("#Passwordl").text($("#Passwordl").text() + " " + err.err)
    }
}

function ResetError(){
    $("#fname").css("border-bottom","2px solid rgb(87, 34, 15)");
    $("#email").css("border-bottom","2px solid rgb(87, 34, 15)");
    $("#lpassword").css("border-bottom","2px solid rgb(87, 34, 15)");
    $("#Namel").text("Name");
    $("#Emaill").text("E-Mail");
    $("#Passwordl").text("Password");
}
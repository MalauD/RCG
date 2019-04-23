 function GetAccountName(callback){
    //Request Account Name
    $.ajax({
        url:'/Account/User/Name',
        type:'GET',
        success: function(data){
            callback(data.Name);
        },
        error: function(){}
    })
 }
 

 function GetAccount(callback){
    //Request Account details (name + mail)
    $.ajax({
        url:'/Account/User',
        type:'GET',
        success: function(data){
            callback(data);
        },
        error: function(){}
    })
 }


 $(document).ready(()=>{
     //When doc ready request the user details
     GetAccount((data)=>{
        $('#AccountName').text(data.Name);
        $('#AccountMail').text(data.Mail);
     })
 })
 
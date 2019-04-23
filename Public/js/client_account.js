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
 

 function GetAccount(){

 }
 
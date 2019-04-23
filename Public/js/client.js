
var content;

window.onload = function(){
    var input = document.getElementById("search");

    content = document.getElementsByClassName("Content")[0];

    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {   
            event.preventDefault();
          
            console.log("ok");
    
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET",'/foods/'+input.value, false );
            xmlHttp.send(null);

            ShowResult(JSON.parse(xmlHttp.responseText));
    
        }
      });

    //Request account name and Display it (ex Name="Malo")
    //Display the logout link
    GetAccountName((Name)=> {
        $("#AccountLink").text(Name);
        $(".topnav").append('<a href="/Logout" style="float:right">Logout</a>')
    })

}

function ShowResult(json){
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    for(var i = 0; i < json.length; i++) {

        var divCard = document.createElement('div');
        divCard.setAttribute('class', 'Card');


        var img = document.createElement("img");
        img.setAttribute('src',json[i].ImageLink);
        divCard.appendChild(img);

        var p = document.createElement("p");
        p.innerHTML = json[i].Name;
        divCard.appendChild(p);

        var p1 = document.createElement("p1");
        p1.setAttribute('class', 'desc');
        p1.innerHTML = json[i].Content;
        divCard.appendChild(p1);

        divCard.addEventListener("click", OnCardClick);

        content.appendChild(divCard);
        
    }
}

function OnCardClick(event){
    
}

var app = new Framework7({
	root: "#app", /* this is the app element in html */
	routes: [
		{
			path: '/page2/',
			url: 'pages/page2.html',
		}
	]
})


var mainView = app.views.create('.view-main');

document.addEventListener("deviceready", init, false);
var tp = document.getElementById("takePic");
var si = document.getElementById("sendIt");
si.style.visibility = "hidden";

function init() {
        //camera code goes here

    $(tp).on("click", takePic);

    function takePic() {
        console.log("user tapped")
        navigator.camera.getPicture(cameraSuccess, cameraFail, cameraOptions);
    }

    var cameraOptions = {
        quality: 100
    }
   
    function cameraSuccess(imageData) {
        console.log("great pic!");

        si.style.visibility = "visible";
        si.style.marginTop = "125px";
        si.style.paddingBottom = "55px";

        $("#gallery").append("<img src='" + imageData + "'>");
        if(tp.style.display === "none"){
            tp.style.display = "block";
            // otherE.classList.toggle("active");
            // tp.classList.toggle("active");
        }
        else {
            tp.style.display = "none";
        }
    }


    function cameraFail(message) {
        alert("failure due to: " + message);
    }

}

si.addEventListener("click", function(){
    si.style.display = "none";
    listContacts();
});


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    console.log(navigator.contatcs);
}


function conSuccess(contacts){
    var ul = document.getElementById('contacts-list');
    for (var i = 0; i < contacts.length; i++){
        var newLI = document.createElement('li');
        newLI.innerHTML = contacts[i].name.formatted;
        ul.appendChild(newLI);
    }
}



function conError(contactError){
    alert('Error!');
}

function listContacts(){
    var options = new ContactFindOptions();
    options.filter="";
    options.multiple = true;
    var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
    navigator.contacts.find(fields, conSuccess, conError, options);
    options.hasPhoneNumber = true;
    options.desiredFields = [navigator.contacts.fieldType.id];
}


window.onload = makeRequest;

var xhr = false;

function makeRequest() {
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		/* for IE 6 */
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) {  }
		}
	}

	if (xhr) {
		xhr.onreadystatechange = showState;
		xhr.open("GET", "03_03.xml", true);
		xhr.send(null);
	} else {
		document.getElementById("updateArea").innerHTML = 
		"Sorry, but I couldn't create an XMLHttpRequest";
	}
}

function showState() {
	var currMsg = document.getElementById("updateArea").innerHTML;
	
	document.getElementById("updateArea").innerHTML = 
	currMsg + "<p>The current state is " + xhr.readyState + 
	"and the status is " + xhr.status + "</p>";
}
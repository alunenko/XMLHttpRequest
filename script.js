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
		xhr.open("GET", "colors.xml", true);
		xhr.send(null);
	} else {
		document.getElementById("updateArea").innerHTML = 
		"Sorry, but I couldn't create an XMLHttpRequest";
	}
}

function showState() {
	var outMsg;
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			var outMsg = xhr.responseText;
		} else {
			var outMsg = "There was a problem with the request: readyState(" + 
				xhr.readyState + "), status(" + 
				xhr.status + ")";
		}

		document.getElementById("updateArea").innerHTML = outMsg;
	}
}
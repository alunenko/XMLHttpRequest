window.onload = initAll;

var xhr = false,
	xPos, yPos;

function initAll() {
	var allLinks = document.getElementsByTagName('a');

	for (var i = 0; i < allLinks.length; i++) {
		allLinks[i].onmouseover = showPreview;
	}
}

function showPreview (e) {
	if (e) {
		var url = e.target;
	} else {
		e = window.event;
		var url = e.srcElement;
	}

	xPos = e.clientX;
	yPos = e.clientY;

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
		xhr.open("GET", url, true);
		xhr.send(null);
	} else {
		alert("Sorry, but I couldn't create an XMLHttpRequest");
	}
}

function showState () {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			var outMsg = xhr.responseText;
		} else {
			var outMsg = "There was a problem with the request: readyState(" + 
				xhr.readyState + "), status(" + 
				xhr.status + ")";
		}

		var prewWin = document.getElementById('preview-window');
		prewWin.innerHTML = outMsg;
		prewWin.style.top = parseInt(yPos) + 2 + "px";
		prewWin.style.left = parseInt(xPos) + 2 + "px";
		prewWin.style.visibility = "visible";
		prewWin.onmouseout = function () {
			prewWin.style.visibility = "hidden";
		}
	}
}
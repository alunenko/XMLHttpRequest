window.onload = initAll;
var xhr = false,
	colorsArray = [];

function initAll () {
	document.getElementById("searchField").onkeyup = searchSuggest;

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
		xhr.onreadystatechange = setStatesArray;
		xhr.open("GET", "colors.xml", true);
		xhr.send(null);
	} else {
		alert("Sorry, but I couldn't create an XMLHttpRequest");
	}
}

function setStatesArray () {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			if (xhr.responseXML) {
				var allColors = xhr.responseXML.getElementsByTagName("color");

				for (var i = 0; i < allColors.length; i++) {
					colorsArray[i] = allColors[i].getElementsByTagName("name")[0].firstChild;
				};
			}
		} else {
			alert("There was a problem with the request: readyState(" + 
				xhr.readyState + "), status(" + 
				xhr.status + ")");
		}
	}
}

function searchSuggest () {
	var el_input = document.getElementById("searchField"),
		el_popups = document.getElementById("popups"),
		str = el_input.value;

	el_input.className = "";

	if (str != "") {
		el_popups.innerHTML = "";

		for (var i = 0; i < colorsArray.length; i++) {
			var thisState = colorsArray[i].nodeValue;

			if (thisState.toLowerCase().indexOf(str.toLowerCase()) == 0) {
				var tempDiv = document.createElement("div");
				tempDiv.innerHTML = thisState;
				tempDiv.onclick = makeChoise;
				tempDiv.className = "suggestions";
				el_popups.appendChild(tempDiv);
			}
		}

		var foundCt = el_popups.childNodes.length;
		(foundCt == 0) && (el_input.className = "error");
		if (foundCt == 1) {
			el_input.value = el_popups.firstChild.innerHTML;
			el_popups.innerHTML = "";
		}
	}
}

function makeChoise (e) {
	var thisDiv = (e) ? e.target : window.event.srcElement;
	var el_input = document.getElementById("searchField"),
		el_popups = document.getElementById("popups");

	el_input.value = thisDiv.innerHTML;
	el_popups.innerHTML = "";
}
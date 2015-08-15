window.onload = initAll;

var xhr = false,
	dataArray = [],
	formField = "colorField",
	url = "colors.xml";

function initAll () {
	document.getElementById(formField).onkeyup = searchSuggest;

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
		xhr.onreadystatechange = setDataArray;
		xhr.open("GET", url, true);
		xhr.send(null);
	} else {
		alert("Sorry, but I couldn't create an XMLHttpRequest");
	}
}

function setDataArray () {
	var tag1 = "color",
		tag2 = "name";

	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			if (xhr.responseXML) {
				var allData = xhr.responseXML.getElementsByTagName(tag1);

				for (var i = 0; i < allData.length; i++) {
					dataArray[i] = allData[i].getElementsByTagName(tag2)[0].firstChild.nodeValue;
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
	var el_formField = document.getElementById(formField),
		el_popups = document.getElementById("popups"),
		str = el_formField.value;

	el_formField.className = "";

	if (str != "") {
		el_popups.innerHTML = "";

		for (var i = 0; i < dataArray.length; i++) {
			var thisField = dataArray[i];

			if (thisField.toLowerCase().indexOf(str.toLowerCase()) == 0) {
				var tempDiv = document.createElement("div");
				tempDiv.innerHTML = thisField;
				tempDiv.onclick = makeChoise;
				tempDiv.className = "suggestions";
				el_popups.appendChild(tempDiv);
			}
		}

		var foundCt = el_popups.childNodes.length;
		(foundCt == 0) && (el_formField.className = "error");
		if (foundCt == 1) {
			setColor(el_popups.firstChild.innerHTML);
		}
	}
}

function makeChoise (e) {
	var thisDiv = (e) ? e.target : window.event.srcElement;
	setColor(thisDiv.innerHTML);
}

function setColor(newColor) {
	document.getElementById(formField).value = newColor;
	document.bgColor = newColor;
	document.getElementById("popups").innerHTML = "";
}
window.onload = initAll;

var xhr = false,
	dataArray = new Array(),
	url = "students.xml";

function initAll() {
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

	var allItems = document.getElementsByTagName("li");

	for (var i = 0; i < allItems.length; i++) {
		allItems[i].onclick = featureOneItem;
	};
}

function setDataArray() {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			if (xhr.responseXML) {
				var allData = xhr.responseXML.getElementsByTagName("student");

				for (var i = 0; i < allData.length; i++) {
					var tempObj = new Object;

					tempObj.firstName = getVal(allData[i], "firstName");
					tempObj.lastName = getVal(allData[i], "lastName");
					tempObj.seat = getVal(allData[i], "seat");
					tempObj.lunchPeriod = getVal(allData[i], "lunchPeriod");
					tempObj.readingGroup = getVal(allData[i], "readingGroup");

					dataArray[i] = tempObj;
				};
			}
		} else {
			alert("There was a problem with the request: readyState(" + 
				xhr.readyState + "), status(" + 
				xhr.status + ")");
		}
	}

	function getVal(theData, theTag) {
		return theData.getElementsByTagName(theTag)[0].firstChild.nodeValue;
	}
}

function featureOneItem(e) {
	var allItems = document.getElementsByTagName("li");

	for (var i = 0; i < allItems.length; i++) {
		allItems[i].className = "";
	};

	var theItem = (e) ? e.target : window.event.srcElement;
	theItem.className = "active";

	var theStudent = null;

	for (var i = 0; i < dataArray.length; i++) {
		if(theItem.id == dataArray[i].seat) {
			theStudent = dataArray[i];
		}
	}

	if(theStudent) {
		var studentInfo = document.getElementById("detail"),
			theMsg = "<span id='closeBox'>X</span><h3>";

		theMsg += theStudent.firstName + " " + theStudent.lastName;
		theMsg += "</h3>Seat: " + theStudent.seat;
		theMsg += "<br /> Lunch Period: " + theStudent.lunchPeriod;
		theMsg += "<br /> Reading Group: " + theStudent.readingGroup;
		studentInfo.innerHTML = theMsg;

		studentInfo.style.top = (theItem.offsetTop-5) + "px";
		studentInfo.style.left = (theItem.offsetLeft+50) + "px";
		studentInfo.style.visibility = "visible";

		document.getElementById("closeBox").onclick = function() {
			document.getElementById("detail").style.visibility = "hidden";
		};
	}
}
window.onload = initAll;

var allImgs,
	currPic = 1;

function initAll() {
	var callback = {
		success: function(xhr) {
			storePix.innerHTML = xhr.responseText;
			setupPix();
		}
	};

	var storePix = document.createElement("div");
	var connectionObject = YAHOO.util.Connect.asyncRequest(
		"GET", "js/flickrPix.xml", callback
	);

	var smallPix = document.getElementById("pictureBar");

	YAHOO.util.Event.addListener(
		document.getElementById("getPrev"), "click", function() {
			runSlideshow(-1);
		}
	);

	YAHOO.util.Event.addListener(
		document.getElementById("getNext"), "click", function() {
			runSlideshow(1);
		}
	);

	function setupPix() {
		allImgs = YAHOO.util.Selector.query("description", storePix);

		for (var i = 1; i < allImgs.length - 1; i++) {
			var s = allImgs[i].childNodes[0].textContent; // HTML string
			var div = document.createElement('div');
			div.innerHTML = s;

			var newImg = div.getElementsByTagName("img")[0];
			newImg.setAttribute("width", newImg.getAttribute("width")/4);
			newImg.setAttribute("height", newImg.getAttribute("height")/4);
			newImg.setAttribute("id", "pic"+i);
			smallPix.appendChild(newImg);
		}

		newSlideIn();
	}
}

function runSlideshow(imgOffset) {
	oldSlideOut();

	currPic += imgOffset;
	switch (true) {
		case (currPic == allImgs.length - 1):
			currPic = 1;
			break;
		case (currPic < 1):
			currPic = allImgs.length - 2;
			break;
	}
}

function newSlideIn() {
	var docPic = document.getElementById("pic" + currPic);
	document.getElementById("bigPic").src = docPic.src;

	var myAnim = new YAHOO.util.Motion(document.getElementById("bigPic"));
	var theWidth = parseInt(docPic.getAttribute("width"));
	var theHeight = parseInt(docPic.getAttribute("height"));

	myAnim.attributes.height = {
		to: theHeight*4,
		from: theHeight
	};
	myAnim.attributes.width = {
		to: theWidth*4,
		from: theWidth
	}
	myAnim.attributes.point = {
		to: YAHOO.util.Dom.getXY(document.getElementById("bigPic")),
		from: YAHOO.util.Dom.getXY(docPic)
	};
	myAnim.duration = 2.0;
	myAnim.method = YAHOO.util.Easing.bounceOut;
	myAnim.animate();
}

function oldSlideOut() {
	var docPic = document.getElementById("pic" + currPic);
	document.getElementById("bigPic").src = docPic.src;

	var myAnim = new YAHOO.util.Motion(document.getElementById("bigPic"));
	var theWidth = parseInt(docPic.getAttribute("width"));
	var theHeight = parseInt(docPic.getAttribute("height"));

	myAnim.attributes.height = {
		to: theHeight,
		from: theHeight*4
	};
	myAnim.attributes.width = {
		to: theWidth,
		from: theWidth*4
	}
	myAnim.attributes.point = {
		from: YAHOO.util.Dom.getXY(document.getElementById("bigPic")),
		to: YAHOO.util.Dom.getXY(docPic)
	};
	myAnim.duration = 2.0;
	myAnim.method = YAHOO.util.Easing.esaseInStrong;
	myAnim.animate();
	myAnim.onComplete.subscribe(newSlideIn);
}
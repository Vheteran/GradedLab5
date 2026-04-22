var surnameInput = document.getElementById("surname");
var fontSelect = document.getElementById("font");
var colorSelect = document.getElementById("color-select");
var colorPicker = document.getElementById("color-picker");
var fontSizeInput = document.getElementById("font-size-input");
var spacingSlider = document.getElementById("spacing-slider");
var letterSizeSlider = document.getElementById("letter-size-slider");
var boxWidthSlider = document.getElementById("box-width-slider");
var spacingValue = document.getElementById("spacing-value");
var letterSizeValue = document.getElementById("letter-size-value");
var boxWidthValue = document.getElementById("box-width-value");
var applyStyleBtn = document.getElementById("apply-style");
var blendBtn = document.getElementById("blend-now");
var output = document.getElementById("output");

function getMode() {
	var mode = "seq";
	if (document.getElementById("random").checked) {
		mode = "rand";
	}
	if (document.getElementById("reverse").checked) {
		mode = "rev";
	}
	return mode;
}

function getColor() {
	if (colorPicker.value !== "") {
		return colorPicker.value;
	}
	return colorSelect.value;
}

function getSize() {
	var size = parseInt(fontSizeInput.value, 10);
	if (isNaN(size)) {
		size = 16;
	}
	if (letterSizeSlider.value !== "") {
		size = parseInt(letterSizeSlider.value, 10);
	}
	return size;
}

function clearOutput() {
	output.innerHTML = "";
}

function drawSurname() {
	clearOutput();

	var surname = surnameInput.value.trim();
	if (surname === "") {
		return;
	}

	var mode = getMode();
	var spacing = parseInt(spacingSlider.value, 10);
	if (isNaN(spacing)) {
		spacing = 15;
	}

	var size = getSize();
	var color = getColor();
	var letters = surname.split("");

	if (mode === "rev") {
		letters.reverse();
	}

	for (var i = 0; i < letters.length; i++) {
		var oneLetter = document.createElement("span");
		oneLetter.className = "letter";
		oneLetter.textContent = letters[i];
		oneLetter.style.color = color;
		oneLetter.style.fontSize = size + "px";
		oneLetter.style.fontFamily = fontSelect.value;

		if (mode === "rand") {
			oneLetter.style.left = Math.floor(Math.random() * 301) + "px";
			oneLetter.style.top = Math.floor(Math.random() * 101) + "px";
		} else {
			var point = (i + 1) * spacing;
			oneLetter.style.left = point + "px";
			oneLetter.style.top = point + "px";
		}

		output.appendChild(oneLetter);
	}
}

function applyStyle() {
	var items = output.getElementsByClassName("letter");
	var color = getColor();
	var size = getSize();
	var fontName = fontSelect.value;

	for (var i = 0; i < items.length; i++) {
		items[i].style.color = color;
		items[i].style.fontSize = size + "px";
		items[i].style.fontFamily = fontName;
	}
}

function syncColorSelectToPicker() {
	if (colorSelect.value === "black") {
		colorPicker.value = "#000000";
	} else if (colorSelect.value === "red") {
		colorPicker.value = "#ff0000";
	} else if (colorSelect.value === "blue") {
		colorPicker.value = "#0000ff";
	} else if (colorSelect.value === "green") {
		colorPicker.value = "#008000";
	}
}

function syncPickerToColorSelect() {
	var val = colorPicker.value.toLowerCase();
	if (val === "#000000") {
		colorSelect.value = "black";
	} else if (val === "#ff0000") {
		colorSelect.value = "red";
	} else if (val === "#0000ff") {
		colorSelect.value = "blue";
	} else if (val === "#008000") {
		colorSelect.value = "green";
	}
}

function updateSpacingLabel() {
	spacingValue.textContent = spacingSlider.value + " px";
}

function updateLetterSizeFromSlider() {
	letterSizeValue.textContent = letterSizeSlider.value + " px";
	fontSizeInput.value = letterSizeSlider.value;
}

function updateLetterSizeFromInput() {
	var value = parseInt(fontSizeInput.value, 10);
	if (isNaN(value)) {
		value = 16;
	}
	letterSizeSlider.value = value;
	letterSizeValue.textContent = value + " px";
}

function updateBoxWidth() {
	output.style.width = boxWidthSlider.value + "px";
	boxWidthValue.textContent = boxWidthSlider.value + " px";
}

colorSelect.addEventListener("change", syncColorSelectToPicker);
colorPicker.addEventListener("input", syncPickerToColorSelect);
spacingSlider.addEventListener("input", updateSpacingLabel);
letterSizeSlider.addEventListener("input", updateLetterSizeFromSlider);
fontSizeInput.addEventListener("input", updateLetterSizeFromInput);
boxWidthSlider.addEventListener("input", updateBoxWidth);
applyStyleBtn.addEventListener("click", applyStyle);
blendBtn.addEventListener("click", drawSurname);

window.onload = function () {
	updateSpacingLabel();
	updateLetterSizeFromSlider();
	updateBoxWidth();
	syncColorSelectToPicker();
};

const makeNames = ["VW", "BMW", "Benz", "Audi", "Ford", "Toyota"];

const cars = [
	{
		name: "Karmann Ghia",
		type: "Coupe",
		make: "VW",
		img: "images/vw_vintage.webp"
	},
	{
		name: "BMW 328",
		type: "Roadster",
		make: "BMW",
		img: "images/bmw_vintage.jpg"
	},
	{
		name: "Mercedes-Benz 300SL",
		type: "Gullwing Coupe",
		make: "Benz",
		img: "images/Benz_vintage.jpg"
	},
	{
		name: "Audi Front UW",
		type: "Sedan",
		make: "Audi",
		img: "images/audi_vintage.webp"
	},
	{
		name: "Ford Model A",
		type: "Cabriolet",
		make: "Ford",
		img: "images/ford_vintage.jpg"
	},
	{
		name: "Toyota AA",
		type: "Sedan",
		make: "Toyota",
		img: "images/toyota-vintage.webp"
	},
	{
		name: "BMW 507",
		type: "Convertible",
		make: "BMW",
		img: "images/bmw_vintage.jpg"
	},
	{
		name: "Volkswagen Beetle",
		type: "Hatchback",
		make: "VW",
		img: "images/vw_vintage.webp"
	}
];

const makeList = document.getElementById("make-list");
const carType = document.getElementById("car-type");
const carImg = document.getElementById("car-img");
const guessBtn = document.getElementById("guess-btn");
const feedback = document.getElementById("feedback");
const countEl = document.getElementById("count");
const totalEl = document.getElementById("total");

let currentCar = null;
let count = 0;
let total = 0;

function disableGuessButton() {
	guessBtn.classList.add("disabled");
}

function enableGuessButton() {
	guessBtn.classList.remove("disabled");
}

function populateMakeOptions() {
	for (let index = 0; index < makeNames.length; index += 1) {
		const make = makeNames[index];
		const option = document.createElement("option");
		option.value = String(index);
		option.textContent = make;
		makeList.appendChild(option);
	}
}

function getRandomCar() {
	const randomIndex = Math.floor(Math.random() * cars.length);
	return cars[randomIndex];
}

function updateCounters() {
	countEl.textContent = String(count);
	totalEl.textContent = String(total);
}

function renderCar() {
	currentCar = getRandomCar();
	carType.textContent = currentCar.type;

	carImg.onload = function () {
		carImg.classList.remove("hidden");
		if (feedback.textContent === "Image could not load.") {
			feedback.textContent = "";
			feedback.className = "";
		}
		enableGuessButton();
	};

	carImg.onerror = function () {
		feedback.textContent = "Image could not load.";
		feedback.className = "bad";
		carImg.classList.add("hidden");
		enableGuessButton();
	};

	carImg.src = currentCar.img;
	carImg.alt = currentCar.name + " image";
}

function handleGuess() {
	disableGuessButton();

	const selectedMakeIndex = Number(makeList.value);
	const selectedMake = makeNames[selectedMakeIndex];

	total += 1;
	if (selectedMake === currentCar.make) {
		count += 1;
		feedback.textContent = "Correct!";
		feedback.className = "ok";
	} else {
		feedback.textContent = "Wrong. Correct make: " + currentCar.make;
		feedback.className = "bad";
	}

	updateCounters();
	renderCar();
}

function init() {
	populateMakeOptions();
	renderCar();
	updateCounters();
	guessBtn.addEventListener("click", handleGuess);
}

window.addEventListener("load", init);

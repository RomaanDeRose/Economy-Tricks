// NAV APARECE AL HACER CLICK
const btnNav = document.getElementById("btn-navbar");
const navMobile = document.querySelector(".navMobile");

btnNav.addEventListener("click", () => {
	navMobile.classList.toggle("navMobile__active");
});

const navMobileLinks = document.querySelectorAll(".link");

navMobileLinks.forEach((link) => {
	link.addEventListener("click", () => {
		navMobile.classList.remove("navMobile__active");
	});
});

// HISTORIAL APARECE AL HACER CLICK
const btnHistorial = document.getElementById("btn-history");
const historial = document.querySelector(".historialNav");

btnHistorial.addEventListener("click", () => {
	historial.classList.toggle("historialNav__active");
});

// CREO LA CLASE OPERACIONES
class Operations {
	constructor(type, result) {
		this.type = type;
		this.result = result;
	}
	save(key, value) {
		localStorage.setItem(key, value);
	}
	saveHistorial() {
		const historialContainerResult = document.createElement("div");
		historialContainerResult.classList.add("containerResult");
		const allOperationsParse = JSON.parse(localStorage.getItem("operations"));
		allOperationsParse.forEach((operation) => {
			historialContainerResult.innerHTML = `
					<h4 class="title">${operation.type}:</h4>
					<p class="result">${operation.result}</p>
					`;
		});
		historialOperations.appendChild(historialContainerResult);
		if (localStorage.getItem("darkMode") == "dark") {
			historialContainerResult.style.backgroundColor = "#171717";
		} else {
			historialContainerResult.style.backgroundColor = "#fff";
		}
	}
}

// ACA VAN A IR APARECIENDO LAS OPERACIONES EN EL HISTORIAL
const historialOperations = document.getElementById("historialOperations");
// LAS OPERACIONES HECHAS, VAN A SER GUARDADAS EN ESTE ARRAY, PARA LUEGO RECCORERLO Y MOSTRARLAS
const allOperations = [];

// EVENTO SUBMIT AL PRIMER FORMULARIO DE LA SECCION cálculos
const formMoney = document.getElementById("formMoney");
const finallyResult = document.getElementById("resultDolarOrInflation");

formMoney.addEventListener("submit", (e) => {
	e.preventDefault();
	const formDataOne = new FormData(e.target);
	// const dolar = fetch("https://criptoya.com/api/dolar");
	// const dolarActual = dolar.then((res) => res.json()).then((data) => data.blue);
	// console.log(dolarActual);
	const dolarActual = 200;
	const formula =
		((formDataOne.get("dolar") - dolarActual) / dolarActual) * 100;
	let result;
	if (formula > formDataOne.get("tasa")) {
		result = "Dólar";
		finallyResult.innerHTML = `
		<h3>Te conviene invertir en:</h3>
		<p>${result}</p>
		`;
	} else if (formula == formDataOne.get("tasa")) {
		result = "Cualquiera de los dos";
		finallyResult.innerHTML = `
		<h3>Te conviene invertir en:</h3>
		<p>${result}! El retorno será el mismo</p>
		`;
	} else {
		result = "Plazo Fijo";
		finallyResult.innerHTML = `
		<h3>Te conviene invertir en:</h3>
		<p>${result}</p>
		`;
	}
	const operationDolOrPF = new Operations("Dolar ó PLazo Fijo", result);
	allOperations.push(operationDolOrPF);
	operationDolOrPF.save("operations", JSON.stringify(allOperations));
	operationDolOrPF.saveHistorial();
	formMoney.reset();
});

const formSalary = document.getElementById("formSalary");
const resultSalary = document.getElementById("resultSalary");

// EVENTO SUBMIT AL SEGUNDO FORMULARIO DE LA SECCION cálculos
formSalary.addEventListener("submit", (e) => {
	e.preventDefault();
	const formDataTwo = new FormData(e.target);
	const salaryResult = (
		formDataTwo.get("ingreso") -
		(formDataTwo.get("ipc") * formDataTwo.get("ingreso")) / 100
	).toFixed(2);
	resultSalary.innerHTML = `
	<h3>Tu Poder Adquisitivo es de:</h3>
	<p>$${salaryResult}</p>
	`;
	const operationSalary = new Operations("Salario Real", salaryResult);
	allOperations.push(operationSalary);
	operationSalary.save("operations", JSON.stringify(allOperations));
	operationSalary.saveHistorial();
	formSalary.reset();
});

// CARRUSEL DE ECONOMISTAS
const carrusel = document.querySelector(".carrusel-items");
let speedCarrusel = 5;
const maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;

const startCarrusel = () => {
	setInterval(() => {
		carrusel.scrollLeft = carrusel.scrollLeft + speedCarrusel;
		if (carrusel.scrollLeft === maxScrollLeft) {
			speedCarrusel = -5;
		} else if (carrusel.scrollLeft === 0) {
			speedCarrusel = 5;
		}
	}, 10);
};

// PONGO EN MOVIMIENTO EL CARRUSEL
startCarrusel();

// FUNCION PARA CAMBIAR EL COLOR DE LOS ELEMENTOS
const changeColorCollection = (collection, color) => {
	for (let i = 0; i < collection.length; i++) {
		collection[i].style.color = color;
	}
};

// MODO OSCURO O CLARO
let darkMode;
const titleSections = document.getElementsByTagName("h2");
const buttons = document.getElementsByTagName("button");
const icons = document.getElementsByTagName("i");
const cards = document.getElementsByClassName("divs");

// FUNCIONAMIENTO DEL MODO OSCURO
if (localStorage.getItem("darkMode")) {
	darkMode = localStorage.getItem("darkMode");
} else {
	darkMode = "light";
}

localStorage.setItem("darkMode", darkMode);

$(() => {
	if (localStorage.getItem("darkMode") == "dark") {
		$("#botonDarkMode").slideUp(0);
		$("#botonLightMode").slideDown(0);
		$("body").addClass("dark");
		changeColorCollection(buttons, "#171717");
		changeColorCollection(titleSections, "#171717");
		changeColorCollection(icons, "#171717");
		changeColorCollection(cards, "#171717");
	} else {
		$("#botonLightMode").slideUp(0);
	}

	$("#botonLightMode").click(() => {
		$("#botonDarkMode").slideDown(0);
		$("#botonLightMode").slideUp(0);
		$("body").removeClass("dark");
		changeColorCollection(buttons, "#fff");
		changeColorCollection(titleSections, "#fff");
		changeColorCollection(icons, "#fff");
		changeColorCollection(cards, "#fff");
		localStorage.setItem("darkMode", "light");
	});

	$("#botonDarkMode").click(() => {
		$("#botonDarkMode").slideUp(0);
		$("#botonLightMode").slideDown(0);
		$("body").addClass("dark");
		changeColorCollection(buttons, "#171717");
		changeColorCollection(titleSections, "#171717");
		changeColorCollection(icons, "#171717");
		changeColorCollection(cards, "#171717");
		localStorage.setItem("darkMode", "dark");
	});
});

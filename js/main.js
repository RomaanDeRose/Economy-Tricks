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
	const operationDolOrPF = new Operations("Dolar o PLazo Fijo", result);
	allOperations.push(operationDolOrPF);
	operationDolOrPF.save("operations", JSON.stringify(allOperations));
	operationDolOrPF.saveHistorial();
	formMoney.reset();
});

// // submit con JQUERY
// $("#formMoney").submit(function (e) {
// 	e.preventDefault();
// 	const formDataOne = new FormData(e.target);
// 	const dolarActual = 200;
// 	const formula =
// 		((formDataOne.get("dolar") - dolarActual) / dolarActual) * 100;
// 	let result;
// 	if (formula > formDataOne.get("tasa")) {
// 		result = "Dólar";
// 		$("#resultDolarOrInflation").append("<h3>Te conviene invertir en:</h3>");
// 		$("#resultDolarOrInflation").append("<p>Dólar</p>");
// 	} else if (formula == formDataOne.get("tasa")) {
// 		result = "Cualquiera de los dos";
// 		$("#resultDolarOrInflation").append("<h3>Te conviene invertir en:</h3>");
// 		$("#resultDolarOrInflation").append(
// 			"<p>Cualquiera de los dos! El retorno será el mismo</p>"
// 		);
// 	} else {
// 		result = "Plazo Fijo";
// 		$("#resultDolarOrInflation").append("<h3>Te conviene invertir en:</h3>");
// 		$("#resultDolarOrInflation").append("<p>Plazo Fijo</p>");
// 	}
// 	const operationDolOrPF = new Operations("Dolar o PLazo Fijo", result);
// 	allOperations.push(operationDolOrPF);
// 	operationDolOrPF.save("operations", JSON.stringify(allOperations));
// 	operationDolOrPF.saveHistorial();
// 	e.target.reset();
// });

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

// // ANIMACIONES ANIDADAS
// function animateButton() {
// 	$("#animateButton").animate(
// 		{
// 			width: "160px",
// 		},
// 		600,
// 		function () {
// 			$("#animateButton").animate(
// 				{
// 					height: "70px",
// 				},
// 				1200
// 			);
// 		}
// 	);
// }

// const animatedButton = document.getElementById("button");
// animatedButton.addEventListener("click", (e) => {
// 	e.preventDefault();
// 	animateButton();
// });
// // FIN ANIMACIONES ANIDADAS

// otro submit con JQUERY
// $("#formSalary").submit(function (e) {
// 	e.preventDefault();
// 	const formDataTwo = new FormData(e.target);
// 	const salaryResult = (
// 		formDataTwo.get("ingreso") -
// 		(formDataTwo.get("ipc") * formDataTwo.get("ingreso")) / 100
// 	).toFixed(2);
// 	$("#resultSalary").append("<h3>Tu Poder Adquisitivo es:</h3>");
// 	$("#resultSalary").append(`<p>$${salaryResult}</p>`);
// 	const operationSalary = new Operations("Salario Real", salaryResult);
// 	allOperations.push(operationSalary);
// 	operationSalary.save("operations", JSON.stringify(allOperations));
// 	operationSalary.saveHistorial();
// 	e.target.reset();
// });

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

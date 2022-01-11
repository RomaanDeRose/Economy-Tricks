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

// ACA VAN A IR APARECIENDO LAS OPERACIONES EN EL HISTORIAL
const historialOperations = document.getElementById("historialOperations");
const cantOperations = document.querySelector(".cantOpertaions");
const cantOperationsText = cantOperations.children[0];
// LAS OPERACIONES HECHAS, VAN A SER GUARDADAS EN ESTE ARRAY, PARA LUEGO RECCORERLO Y MOSTRARLAS
const allOperations = [];

// CREO LA CLASE OPERACIONES
class Operations {
	constructor(type, result, date) {
		this.type = type;
		this.result = result;
		this.date = date;
	}
	save(key, value) {
		localStorage.setItem(key, value);
	}
	saveHistorial() {
		const historialContainerResult = document.createElement("div");
		historialContainerResult.classList.add("containerResult");
		const allOperationsParse = JSON.parse(localStorage.getItem("operations"));
		allOperationsParse.forEach((operation, index) => {
			historialContainerResult.innerHTML = `
					<h4 class="title">${operation.type}:</h4>
					<p class="result">${operation.result}</p>
					<p class="date">${operation.date}</p>
					`;
			cantOperationsText.textContent = index + 1;
		});
		historialOperations.appendChild(historialContainerResult);
		if (localStorage.getItem("darkMode") == "dark") {
			historialContainerResult.style.backgroundColor = "#171717";
		} else {
			historialContainerResult.style.backgroundColor = "#fff";
		}
	}
}

// CREO FUNCION PARA OBTENER LA HORA ACTUAL DE MANERA CORRECTA
const addZero = (date) => {
	if (date.toString().length < 2) {
		return "0".concat(date);
	} else {
		return date;
	}
};

// CREO FUNCION PARA OBTENER EL MES ACTUAL DE MANERA CORRECTA
const monthString = (month) => {
	switch (month) {
		case 0:
			month = "01";
			break;
		case 1:
			month = "02";
			break;
		case 2:
			month = "03";
			break;
		case 3:
			month = "04";
			break;
		case 4:
			month = "05";
			break;
		case 5:
			month = "06";
			break;
		case 6:
			month = "07";
			break;
		case 7:
			month = "08";
			break;
		case 8:
			month = "09";
			break;
		case 9:
			month = "10";
			break;
		case 10:
			month = "11";
			break;
		case 11:
			month = "12";
			break;
		default:
			break;
	}
	return month;
};

const formMoney = document.getElementById("formMoney");
const finallyResult = document.getElementById("resultDolarOrInflation");

// FUNCION PARA LA SECCION cálculos CON API DE criptoYA
const dolarOrPF = async () => {
	const peticion = await fetch("https://criptoya.com/api/dolar");
	const valores = await peticion.json();
	const dolarActual = await valores.blue;
	let date = new Date();
	const dateDay = addZero(date.getDate());
	const dateMonth = monthString(date.getMonth());
	const dateHour = addZero(date.getHours());
	const dateMinutes = addZero(date.getMinutes());
	const formDataOne = new FormData(formMoney);
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
	const operationDolOrPF = new Operations(
		"Inversión",
		result,
		`${dateDay}/${dateMonth}, ${dateHour}:${dateMinutes}`
	);
	allOperations.push(operationDolOrPF);
	operationDolOrPF.save("operations", JSON.stringify(allOperations));
	operationDolOrPF.saveHistorial();
	formMoney.reset();
};

formMoney.addEventListener("submit", (e) => {
	e.preventDefault();
	dolarOrPF();
});

// EVENTO SUBMIT AL SEGUNDO FORMULARIO DE LA SECCION cálculos
const formSalary = document.getElementById("formSalary");
const resultSalary = document.getElementById("resultSalary");

formSalary.addEventListener("submit", (e) => {
	let date = new Date();
	const dateDay = addZero(date.getDate());
	const dateMonth = monthString(date.getMonth());
	const dateHour = addZero(date.getHours());
	const dateMinutes = addZero(date.getMinutes());
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
	const operationSalary = new Operations(
		"Salario Real",
		`$${salaryResult}`,
		`${dateDay}/${dateMonth}, ${dateHour}:${dateMinutes}`
	);
	allOperations.push(operationSalary);
	operationSalary.save("operations", JSON.stringify(allOperations));
	operationSalary.saveHistorial();
	formSalary.reset();
});

// CARRUSEL DE ECONOMISTAS
const carrusel = document.querySelector(".carrusel-items");
let speedCarrusel = 1.2;
const maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;

const startCarrusel = () => {
	setInterval(() => {
		carrusel.scrollLeft = carrusel.scrollLeft + speedCarrusel;
		if (carrusel.scrollLeft === maxScrollLeft) {
			speedCarrusel = -1.2;
		} else if (carrusel.scrollLeft === 0) {
			speedCarrusel = 1.2;
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
const titleSections = document.getElementsByTagName("h2");
const buttons = document.getElementsByTagName("button");
const icons = document.getElementsByTagName("i");
const cards = document.getElementsByClassName("divs");
const footerText = document.getElementById("footerText");
let darkMode;

// FUNCIONAMIENTO DEL MODO OSCURO
localStorage.getItem("darkMode")
	? (darkMode = localStorage.getItem("darkMode"))
	: (darkMode = "light");

localStorage.setItem("darkMode", darkMode);

$(() => {
	if (localStorage.getItem("darkMode") == "dark") {
		$("#botonDarkMode").slideUp(0);
		$("#botonLightMode").slideDown(0);
		$("body").addClass("dark");
		footerText.style.color = "#171717";
		cantOperations.style.backgroundColor = "#171717";
		pantalla.style.backgroundColor = "#171717";
		botonesColor(botones, "#171717");
		botonesColor(funciones, "#171717");
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
		footerText.style.color = "#fff";
		cantOperations.style.backgroundColor = "#fff";
		pantalla.style.backgroundColor = "#fff";
		botonesColor(botones, "#fff");
		botonesColor(funciones, "#fff");
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
		footerText.style.color = "#171717";
		cantOperations.style.backgroundColor = "#171717";
		pantalla.style.backgroundColor = "#171717";
		botonesColor(botones, "#171717");
		botonesColor(funciones, "#171717");
		changeColorCollection(buttons, "#171717");
		changeColorCollection(titleSections, "#171717");
		changeColorCollection(icons, "#171717");
		changeColorCollection(cards, "#171717");
		localStorage.setItem("darkMode", "dark");
	});
});

// CALCULADORA

const botones = document.querySelectorAll(".botones");
const funciones = document.querySelectorAll(".funciones");
const pantalla = document.getElementById("pantalla");
const borrar = document.getElementById("borrar");
const resultado = document.getElementById("resultado");
const reset = document.getElementById("reset");

// FUNCION PARA CAMBIAR LOS COLORES EN EL DARK MODE
const botonesColor = (i, color) => {
	i.forEach((boton) => {
		boton.style.backgroundColor = color;
	});
};

// AGREGO LOS NUMEROS A LA PANTALLA
botones.forEach((boton) => {
	boton.addEventListener("click", () => {
		pantalla.value += boton.value;
	});
});

// BORRO LOS NUMEROS DE A UNO
borrar.addEventListener("click", () => {
	pantalla.value = pantalla.value.slice(0, -1);
});

// CALCULO EL RESULTADO
resultado.addEventListener("click", () => {
	try {
		const calculo = eval(pantalla.value).toFixed(1);
		pantalla.value = calculo;
		let date = new Date();
		const dateDay = addZero(date.getDate());
		const dateMonth = monthString(date.getMonth());
		const dateHour = addZero(date.getHours());
		const dateMinutes = addZero(date.getMinutes());
		const operationCalc = new Operations(
			"Calculadora",
			`Resultado: <b>${calculo}</b>`,
			`${dateDay}/${dateMonth}, ${dateHour}:${dateMinutes}`
		);
		allOperations.push(operationCalc);
		operationCalc.save("operations", JSON.stringify(allOperations));
		operationCalc.saveHistorial();
	} catch (e) {
		window.innerHTML = e;
	}
});

// BORRO TODO DE LA PANTALLA
reset.addEventListener("click", () => {
	pantalla.value = "";
});

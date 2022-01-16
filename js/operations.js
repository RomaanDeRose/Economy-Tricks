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

// LAS OPERACIONES HECHAS, VAN A SER GUARDADAS EN ESTE ARRAY, PARA LUEGO RECCORERLO Y MOSTRARLAS
const allOperations = [];

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
	saveInHistorial();
	formMoney.reset();
};

// EVENTO SUBMIT AL PRIMER FORMULARIO DE LA SECCION cálculos
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
	saveInHistorial();
	formSalary.reset();
});

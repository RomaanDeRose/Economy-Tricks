// CALCULADORA

// VARIABLES
const botones = document.querySelectorAll(".botones");
const funciones = document.querySelectorAll(".funciones");
const pantalla = document.getElementById("pantalla");
const borrar = document.getElementById("borrar");
const resultado = document.getElementById("resultado");
const reset = document.getElementById("reset");

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

const modalError = document.querySelector(".modal");
// CALCULO EL RESULTADO
resultado.addEventListener("click", () => {
	// MANEJO EXCEPCIÓN CON try & catch
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
		saveInHistorial();
	} catch (e) {
		setTimeout(() => {
			// MODAL DE ERRROR
			modalError.classList.add("modalError");
			modalError.innerHTML += `
				<p>ERROR :(</p>
				<p>No se puede realizar dicha operación</p>
			`;
			localStorage.getItem("darkMode") == "dark"
				? (modalError.style.color = "#171717")
				: (modalError.style.color = "#fff");
		}, 100);
	}
	setTimeout(() => {
		modalError.classList.remove("modalError");
		modalError.innerHTML = "";
	}, 2500);
});

// BORRO TODO DE LA PANTALLA
reset.addEventListener("click", () => {
	pantalla.value = "";
});

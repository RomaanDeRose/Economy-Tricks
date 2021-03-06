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
}

// ACA VAN A IR APARECIENDO LAS OPERACIONES EN EL HISTORIAL
const historialOperations = document.getElementById("historialOperations");
const cantOperations = document.querySelector(".cantOpertaions");
const cantOperationsText = cantOperations.children[0];

// FUNCION PARA AGREGAR OPERACIONES AL HISTORIAL
const saveInHistorial = () => {
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
	localStorage.getItem("darkMode") == "dark"
		? (historialContainerResult.style.backgroundColor = "#171717")
		: (historialContainerResult.style.backgroundColor = "#fff");
};

// ESTE BOTON VA A BORRAR EL HISTORIAL
const clearBtn = document.getElementById("clearHistory");

// FUNCION PARA BORRAR EL HISTORIAL
const clearHistory = () => {
	allOperations.splice(0, allOperations.length);
	localStorage.removeItem("operations");
	historialOperations.innerHTML = "";
	cantOperationsText.textContent = "0";
};

clearBtn.addEventListener("click", clearHistory);

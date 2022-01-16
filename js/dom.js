// NAV APARECE AL HACER CLICK
const btnNav = document.getElementById("btn-navbar");
const navMobile = document.querySelector(".navMobile");

btnNav.addEventListener("click", () => {
	navMobile.classList.toggle("navMobile__active");
});

// NAV DESAPARECE AL HACER CLICK EN EL ENLACE
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

// MODO OSCURO O CLARO

// FUNCION PARA CAMBIAR LOS COLORES DE LA CALCULADORA EN EL DARK MODE
const botonesColor = (i, color) => {
	i.forEach((boton) => {
		boton.style.backgroundColor = color;
	});
};

// FUNCION PARA CAMBIAR LOS COLORES DE LOS htmlCollection
const changeColorCollection = (collection, color) => {
	for (let i = 0; i < collection.length; i++) {
		collection[i].style.color = color;
	}
};

// VARIABLES DEL MODO OSCURO
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
		clearBtn.style.backgroundColor = "#171717";
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
		clearBtn.style.backgroundColor = "#fff";
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
		clearBtn.style.backgroundColor = "#171717";
		botonesColor(botones, "#171717");
		botonesColor(funciones, "#171717");
		changeColorCollection(buttons, "#171717");
		changeColorCollection(titleSections, "#171717");
		changeColorCollection(icons, "#171717");
		changeColorCollection(cards, "#171717");
		localStorage.setItem("darkMode", "dark");
	});
});

// CARRUSEL DE ECONOMISTAS
const carrusel = document.querySelector(".carrusel-items");
let speedCarrusel = 1.2;
const maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;

// FUNCION PARA PONER EN MOVIMINETO EL CARRUSEL
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

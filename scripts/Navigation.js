var Navigation = {
	clicked: false, // Variable para indicar si se ha hecho clic en un enlace

	init: function () {
		// var secciones = document.querySelectorAll('section');
		var secciones = Array.from(document.querySelectorAll('section')).filter(function (seccion) {
			return seccion.getAttribute('id') !== 'slider-no-nav';
		});
		var enlaces = document.querySelectorAll('.navigation a');

		function updateNavigation() {
			var posicionActual = window.pageYOffset;
			var seccionActual = null;

			secciones.forEach(function (seccion, index) {
				var seccionID = seccion.getAttribute('id');
				var enlace = enlaces[index];

				var posicionSuperior = seccion.offsetTop - 50;
				var posicionInferior = posicionSuperior + seccion.offsetHeight;

				if (posicionActual >= posicionSuperior && posicionActual < posicionInferior) {
					seccionActual = seccionID;
				}

				if (!Navigation.clicked) {
					enlace.classList.remove('active');
					var circulo = enlace.querySelector('span');
					circulo.style.backgroundColor = '#ccc';
				}
			});

			if (seccionActual) {
				var enlaceActual = document.querySelector('.navigation a[href="#' + seccionActual + '"]');
				if (enlaceActual) {
					enlaceActual.classList.add('active');
					var circuloActual = enlaceActual.querySelector('span');
					circuloActual.style.backgroundColor = '#333';
				}
			} else {
				enlaces.forEach(function (enlace) {
					if (!Navigation.clicked) {
						enlace.classList.remove('active');
						var circulo = enlace.querySelector('span');
						circulo.style.backgroundColor = '#ccc';
					}
				});
				enlaces[0].classList.add('active');
				var primerCirculo = enlaces[0].querySelector('span');
				primerCirculo.style.backgroundColor = '#333';
			}

			if (posicionActual < secciones[secciones.length - 1].offsetTop) {
				var ultimoEnlace = enlaces[enlaces.length - 1];
				if (!Navigation.clicked) {
					ultimoEnlace.classList.remove('active');
					var ultimoCirculo = ultimoEnlace.querySelector('span');
					ultimoCirculo.style.backgroundColor = '#ccc';
				}
			}

			Navigation.clicked = false; // Restablecer la variable clicked a false
		}

		window.addEventListener('scroll', updateNavigation);
		document.addEventListener('DOMContentLoaded', updateNavigation);
	},

	scrollTo: function (selector) {
		var destino = document.querySelector(selector);

		if (destino) {
			Navigation.clicked = true; // Establecer la variable clicked a true
			window.scrollTo({
				top: destino.offsetTop,
				behavior: 'smooth',
			});
		}
	},
};

Navigation.init();

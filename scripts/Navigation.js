var Navigation = {
	clicked: false, // Variable para indicar si se ha hecho clic en un enlace

	init: function () {
		var secciones = Array.from(document.querySelectorAll('section')).filter(function (seccion) {
			return seccion.getAttribute('id') !== 'slider-no-nav';
		});
		var enlaces = document.querySelectorAll('.navigation a');

		function updateNavigation() {
			if (!Navigation.clicked) {
				var posicionActual = window.pageYOffset + (window.innerHeight / 2); // Considerar la posición media del viewport
				var seccionActual = null;

				secciones.forEach(function (seccion, index) {
					var seccionID = seccion.getAttribute('id');
					var enlace = enlaces[index];

					var posicionSuperior = seccion.offsetTop - 50;
					var posicionInferior = posicionSuperior + seccion.offsetHeight;

					if (posicionActual >= posicionSuperior && posicionActual < posicionInferior) {
						seccionActual = seccionID;
					}

					enlace.classList.remove('active');
					var circulo = enlace.querySelector('span');
					circulo.style.backgroundColor = '#ccc';
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
						enlace.classList.remove('active');
						var circulo = enlace.querySelector('span');
						circulo.style.backgroundColor = '#ccc';
					});
					enlaces[0].classList.add('active');
					var primerCirculo = enlaces[0].querySelector('span');
					primerCirculo.style.backgroundColor = '#333';
				}

				// Verificar si el usuario se encuentra en la última sección
				var ultimaSeccion = secciones[secciones.length - 1];
				var posicionInferiorUltimaSeccion = ultimaSeccion.offsetTop + ultimaSeccion.offsetHeight;
				if (posicionActual >= posicionInferiorUltimaSeccion) {
					var enlaceUltimaSeccion = document.querySelector('.navigation a[href="#' + ultimaSeccion.getAttribute('id') + '"]');
					if (enlaceUltimaSeccion) {
						enlaceUltimaSeccion.classList.add('active');
						var circuloUltimaSeccion = enlaceUltimaSeccion.querySelector('span');
						circuloUltimaSeccion.style.backgroundColor = '#333';
					}
				}
			}

			Navigation.clicked = false; // Restablecer la variable clicked a false
		}

		function handleClick(event) {
			// Prevenir la propagación del evento para evitar que el clic del span active el enlace equivocado
			event.stopPropagation();

			var span = event.target.closest('span');
			if (span) {
				Navigation.clicked = true;
				var enlace = span.parentElement;
				var selector = enlace.getAttribute('href');
				Navigation.scrollTo(selector);
			}
		}

		enlaces.forEach(function (enlace) {
			enlace.addEventListener('click', handleClick);
		});

		window.addEventListener('scroll', updateNavigation);
	},

	scrollTo: function (selector) {
		var destino = document.querySelector(selector);

		if (destino) {
			// Verificar si el usuario ya está en la sección antes de hacer scroll
			if (!this.isInViewport(destino)) {
				this.clicked = true; // Establecer la variable clicked a true
				window.scrollTo({
					top: destino.offsetTop,
					behavior: 'smooth',
				});
			}
		}
	},

	// Función para verificar si un elemento está visible en la ventana
	isInViewport: function (element) {
		var rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	},
};

Navigation.init();

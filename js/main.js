// Espera a que el DOM se cargue completamente antes de ejecutarse el código
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene referencias a elementos del formulario y otras partes relevantes del DOM
    const formulario = document.getElementById("formPresupuesto");
    const pasos = document.querySelectorAll(".paso");
    const botonesSiguiente = document.querySelectorAll(".btn-siguiente");
    const progressBar = document.querySelector(".progress-bar");
    const botonesAnterior = document.querySelectorAll(".btn-anterior");
    const emailInput = document.getElementById("email");
    const telefonoInput = document.getElementById("telefono");
    const nombreInput = document.getElementById("nombre");
    const apellidosInput = document.getElementById("apellidos");
    const funcionalidad1Input = document.getElementById('funcionalidad1');
    const funcionalidad2Input = document.getElementById('funcionalidad2');
    const tipoDiseñoSelect = document.getElementById('tipoDiseño');
    const plazoEntregaCortoInput = document.getElementById('plazoCorto');
    const numPaginasInput = document.getElementById('numPaginas');
    const idiomaSelect = document.getElementById('idioma');
    let pasoActual = 1; // Variable para saber el paso actual del formulario

    // Precios para cada apartado del presupuesto
    const precios = {
        tipoSitio: {
            blog: 500,
            negocio: 1000,
        },
        funcionalidades: {
            funcionalidad1: 200,
            funcionalidad2: 300,
        },
        tipoDiseño: {
            basico: 300,
            intermedio: 500,
            avanzado: 800,
        },
        plazoEntrega: {
            corto: 100,
            largo: 50,
        },
        numPaginas: {
            precioPorPagina: 20,
        },
        idioma: {
            espanol: 50,
            ingles: 50,
            otros: 100,
        },
    };

    // Función que calcula el presupuesto total según las selecciones del usuario
    function calcularPresupuesto() {
        let presupuesto = 0;

        // Obtiene el valor del tipo de sitio seleccionado
        const tipoSitioValue = document.querySelector('input[name="tipoSitio"]:checked').value;

        // Calcula el presupuesto según selecciones
        presupuesto += precios.tipoSitio[tipoSitioValue];
        if (funcionalidad1Input.checked) presupuesto += precios.funcionalidades.funcionalidad1;
        if (funcionalidad2Input.checked) presupuesto += precios.funcionalidades.funcionalidad2;
        presupuesto += precios.tipoDiseño[tipoDiseñoSelect.value];
        presupuesto += precios.plazoEntrega[plazoEntregaCortoInput.checked ? 'corto' : 'largo'];
        presupuesto += numPaginasInput.value * precios.numPaginas.precioPorPagina;
        presupuesto += precios.idioma[idiomaSelect.value];

        return presupuesto;
    }

    // Función que actualiza la barra de progreso en el formulario
    function actualizarBarraDeProgreso() {
        const progreso = ((pasoActual - 1) / (pasos.length - 1)) * 100;
        progressBar.style.width = `${progreso}%`;
    }

    // Función que valida un correo electrónico usando expresiones regulares
    function validarEmail(email) {
        const validarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validarEmail.test(email);
    }

    // // Función que valida un número de teléfono con 9 dígitos
    function validarTelefono(telefono) {
        const validarTelefono = /^\d{9}$/;
        return validarTelefono.test(telefono);
    }

    // Función para avanzar al siguiente paso del formulario
    function siguientePaso() {
        // Validacion específica para el primer paso
        if (pasoActual === 1) {
            const emailValue = emailInput.value.trim();
            if (emailValue && !validarEmail(emailValue)) {
                alert("Por favor, introduzca un correo electrónico válido.");
                return;
            }

            const telefonoValue = telefonoInput.value.trim();
            if (telefonoValue && !validarTelefono(telefonoValue)) {
                alert("Por favor, introduzca un número de teléfono válido con 9 dígitos.");
                return;
            }

            const nombreValue = nombreInput.value.trim();
            const apellidosValue = apellidosInput.value.trim();
            if (!nombreValue || !apellidosValue) {
                alert("Por favor, completa los campos de nombre y apellidos.");
                return;
            }
        }
        // Ocultar el paso actual y avanzar al siguiente
        pasos[pasoActual - 1].style.display = "none";
        pasoActual++;
        if (pasoActual > pasos.length) {
            pasoActual = pasos.length;

            const presupuesto = calcularPresupuesto();
            alert("Presupuesto: " + presupuesto);
        }
        pasos[pasoActual - 1].style.display = "block";
        // Actualiza la barra de progreso y los botones de navegación
        actualizarBarraDeProgreso();
        actualizarBotones();
    }

    // Función para retroceder al paso anterior del formulario
    function pasoAnterior() {
        // Ocultar el paso actual y retroceder al anterior
        pasos[pasoActual - 1].style.display = "none";
        pasoActual--;
        if (pasoActual < 1) {
            pasoActual = 1;
        }
        pasos[pasoActual - 1].style.display = "block";
        // Actualizar la barra de progreso y los botones de navegación
        actualizarBarraDeProgreso();
        actualizarBotones();
    }

    // Función para actualizar la disponibilidad de los botones de navegación
    function actualizarBotones() {
        // Si es el primer paso, deshabilitar el botón "anterior"
        if (pasoActual === 1) {
            document.querySelector(".btn-anterior").classList.add("disabled");
        } else {
            document.querySelector(".btn-anterior").classList.remove("disabled");
        }

        // // Si es el último paso, deshabilitar el botón "siguiente"
        if (pasoActual === pasos.length) {
            document.querySelector(".btn-siguiente").classList.add("disabled");
        } else {
            document.querySelector(".btn-siguiente").classList.remove("disabled");
        }
    }

    // Asignar eventos a los botones de siguiente y anterior
    botonesSiguiente.forEach((boton) => {
        boton.addEventListener("click", function (e) {
            e.preventDefault();
            siguientePaso();
        });
    });

    botonesAnterior.forEach((boton) => {
        boton.addEventListener("click", pasoAnterior);
    });

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
    });
});
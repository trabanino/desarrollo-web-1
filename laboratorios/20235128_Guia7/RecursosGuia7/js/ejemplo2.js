document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.forms["frmRegistro"];
    const button = formulario.elements["btnRegistro"];
    const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
    const bodyModal = document.getElementById("idBodyModal");

    button.onclick = () => {
        if (validarFormulario()) {
            mostrarInformacion();
        }
    };

    function validarFormulario() {
        const nombre = formulario["idNombre"].value.trim();
        const apellidos = formulario["idApellidos"].value.trim();
        const fechaNac = formulario["idFechaNac"].value;
        const correo = formulario["idCorreo"].value.trim();
        const password = formulario["idPassword"].value;
        const passwordRepetir = formulario["idPasswordRepetir"].value;
        const pais = formulario["idCmPais"].value;
        const intereses = document.querySelectorAll('input[type="checkbox"]:checked');
        const carreraSeleccionada = document.querySelector('input[name="idRdCarrera"]:checked');

        if (!nombre || !apellidos || !fechaNac || !correo || !password || !passwordRepetir) {
            alert('Por favor, complete todos los campos obligatorios.');
            return false;
        }

        const fechaNacimiento = new Date(fechaNac);
        const fechaActual = new Date();
        if (fechaNacimiento > fechaActual) {
            alert('La fecha de nacimiento no puede ser mayor a la fecha actual.');
            return false;
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(correo)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return false;
        }

        if (password !== passwordRepetir) {
            alert('Las contraseñas no coinciden.');
            return false;
        }

        if (intereses.length === 0) {
            alert('Seleccione al menos un interés.');
            return false;
        }

        if (!carreraSeleccionada) {
            alert('Por favor, seleccione una carrera.');
            return false;
        }

        if (pais === 'Seleccione una opción') {
            alert('Por favor, seleccione un país de origen.');
            return false;
        }

        return true;
    }

    function mostrarInformacion() {
        // Limpiar contenido previo del modal
        bodyModal.innerHTML = '';

        const tabla = document.createElement('table');
        tabla.classList.add('table', 'table-striped', 'table-bordered');

        const tbody = document.createElement('tbody');

        const addRow = (key, value) => {
            const row = document.createElement('tr');
            const cellKey = document.createElement('th');
            cellKey.textContent = key;
            const cellValue = document.createElement('td');
            cellValue.textContent = value;
            row.appendChild(cellKey);
            row.appendChild(cellValue);
            tbody.appendChild(row);
        };

        const nombre = formulario["idNombre"].value.trim();
        const apellidos = formulario["idApellidos"].value.trim();
        const fechaNac = formulario["idFechaNac"].value;
        const correo = formulario["idCorreo"].value.trim();
        const paisIndex = formulario["idCmPais"].selectedIndex;
        const pais = formulario["idCmPais"].options[paisIndex].text;
        const intereses = [];
        if (formulario["idCkProgramacion"].checked) intereses.push('Programación');
        if (formulario["idCkBD"].checked) intereses.push('Base de Datos');
        if (formulario["idCkRedes"].checked) intereses.push('Inteligencia Artificial');
        if (formulario["idCkSeguridad"].checked) intereses.push('Seguridad Informática');

        let carrera = '';
        const carreraSeleccionada = document.querySelector('input[name="idRdCarrera"]:checked');
        if (carreraSeleccionada) {
            carrera = carreraSeleccionada.nextElementSibling.textContent;
        }

        addRow('Nombres', nombre);
        addRow('Apellidos', apellidos);
        addRow('Fecha de Nacimiento', fechaNac);
        addRow('Correo Electrónico', correo);
        addRow('País de Origen', pais);
        addRow('Intereses', intereses.join(', '));
        addRow('Carrera', carrera);

        tabla.appendChild(tbody);
        bodyModal.appendChild(tabla);

        modal.show();
    }
});

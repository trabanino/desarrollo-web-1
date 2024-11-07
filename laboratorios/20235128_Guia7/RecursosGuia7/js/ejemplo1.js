document.addEventListener('DOMContentLoaded', function () {
    const btnCrear = document.getElementById('idBtnCrear');
    const cmbElemento = document.getElementById('idCmbElemento');
    const form = document.getElementById('idNewForm');
    const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
    const btnAddElement = document.getElementById('idBtnAddElement');
    const tituloElemento = document.getElementById('idTituloElemento');
    const idElemento = document.getElementById('idIDElemento');
    const nombreElemento = document.getElementById('idNombreElemento');
    const btnValidate = document.getElementById('idBtnValidate');

    let selectedElementType = '';

    btnCrear.addEventListener('click', function () {
        selectedElementType = cmbElemento.value;
        if (!selectedElementType) {
            alert('Por favor, seleccione un elemento.');
            return;
        }
        modal.show();
    });

    btnAddElement.addEventListener('click', function () {
        const label = tituloElemento.value.trim();
        const id = idElemento.value.trim();
        const name = nombreElemento.value.trim();

        if (!label || !id || !name) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Validar que el ID no se repita
        if (document.getElementById(id)) {
            alert('El ID ya existe. Por favor, elija otro ID.');
            return;
        }

        let element;

        if (selectedElementType === 'select') {
            element = document.createElement('select');
            element.classList.add('form-select');
            element.id = id;
            element.name = name;
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Seleccione una opción';
            element.appendChild(option);
        } else if (selectedElementType === 'textarea') {
            element = document.createElement('textarea');
            element.classList.add('form-control');
            element.id = id;
            element.name = name;
        } else if (selectedElementType === 'radio' || selectedElementType === 'checkbox') {
            element = document.createElement('input');
            element.type = selectedElementType;
            element.classList.add('form-check-input');
            element.id = id;
            element.name = name;

            const divCheck = document.createElement('div');
            divCheck.classList.add('form-check');

            const labelElement = document.createElement('label');
            labelElement.htmlFor = id;
            labelElement.classList.add('form-check-label');
            labelElement.textContent = label;

            divCheck.appendChild(element);
            divCheck.appendChild(labelElement);
            form.appendChild(divCheck);
            // Limpiar los campos del modal
            tituloElemento.value = '';
            idElemento.value = '';
            nombreElemento.value = '';
            return;
        } else {
            element = document.createElement('input');
            element.type = selectedElementType;
            element.classList.add('form-control');
            element.id = id;
            element.name = name;
        }

        const div = document.createElement('div');
        div.classList.add('mb-3');
        const labelElement = document.createElement('label');
        labelElement.htmlFor = id;
        labelElement.classList.add('form-label');
        labelElement.textContent = label;
        div.appendChild(labelElement);
        div.appendChild(element);
        form.appendChild(div);

        // Limpiar los campos del modal
        tituloElemento.value = '';
        idElemento.value = '';
        nombreElemento.value = '';
    });

    // Función para validar el formulario
    btnValidate.addEventListener('click', function () {
        const formElements = form.elements;
        let valid = true;
        let messages = [];

        // Recolectar nombres de grupos de radio buttons
        let radioNames = new Set();

        for (let element of formElements) {
            if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
                if (element.type === 'radio') {
                    radioNames.add(element.name);
                }
            }
        }

        for (let element of formElements) {
            if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
                if (element.type === 'radio') {
                    continue; // Se validarán después
                } else if (element.type === 'checkbox') {
                    if (!element.checked) {
                        valid = false;
                        messages.push(`Debe seleccionar la opción: ${element.name}`);
                    }
                } else if (element.type === 'select-one') {
                    if (element.value === '') {
                        valid = false;
                        messages.push(`Debe seleccionar una opción en: ${element.name}`);
                    }
                } else {
                    if (element.value.trim() === '') {
                        valid = false;
                        messages.push(`Debe llenar el campo: ${element.name}`);
                    }
                }
            }
        }

        // Validar grupos de radio buttons
        for (let name of radioNames) {
            const radios = form.querySelectorAll(`input[type="radio"][name="${name}"]`);
            let oneChecked = false;
            for (let radio of radios) {
                if (radio.checked) {
                    oneChecked = true;
                    break;
                }
            }
            if (!oneChecked) {
                valid = false;
                messages.push(`Debe seleccionar una opción de ${name}`);
            }
        }

        if (valid) {
            alert('Todos los campos están llenos y opciones seleccionadas.');
        } else {
            alert(messages.join('\n'));
        }
    });
});

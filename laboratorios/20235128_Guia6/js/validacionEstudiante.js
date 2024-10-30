// Referencias a los elementos del formulario
const carnetInput = document.getElementById('carnet');
const fullNameInput = document.getElementById('fullName');
const duiInput = document.getElementById('dui');
const nitInput = document.getElementById('nit');
const birthDateInput = document.getElementById('birthDate');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');

const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const toast = new bootstrap.Toast(notification);

// Expresiones regulares para validación
const carnetRegex = /^[A-Za-z]{2}\d{3}$/;
const fullNameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const duiRegex = /^\d{8}-\d{1}$/;
const nitRegex = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
const birthDateRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ageRegex = /^\d+$/;

// Función de validación
function validateForm() {
    let errors = [];

    const carnet = carnetInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const dui = duiInput.value.trim();
    const nit = nitInput.value.trim();
    const birthDate = birthDateInput.value.trim();
    const email = emailInput.value.trim();
    const age = ageInput.value.trim();

    if (!carnetRegex.test(carnet)) {
        errors.push('El carnet debe tener el formato dos letras y tres números (e.g., AB001).');
    }

    if (!fullNameRegex.test(fullName)) {
        errors.push('El nombre completo solo debe contener letras y espacios.');
    }

    if (!duiRegex.test(dui)) {
        errors.push('El DUI debe tener el formato ########-#.');
    }

    if (!nitRegex.test(nit)) {
        errors.push('El NIT debe tener el formato ####-######-###-#.');
    }

    if (!birthDateRegex.test(birthDate)) {
        errors.push('La fecha de nacimiento debe tener el formato dd/mm/yyyy.');
    }

    if (!emailRegex.test(email)) {
        errors.push('El correo electrónico no es válido.');
    }

    if (!ageRegex.test(age)) {
        errors.push('La edad debe ser un número.');
    }

    if (errors.length > 0) {
        notificationMessage.innerHTML = errors.join('<br>');
        notification.classList.remove('text-bg-success');
        notification.classList.add('text-bg-danger');
        toast.show();
    } else {
        notificationMessage.innerHTML = 'Formulario enviado correctamente.';
        notification.classList.remove('text-bg-danger');
        notification.classList.add('text-bg-success');
        toast.show();

        // Procesar los datos aquí (e.g., enviar al servidor o mostrar en la página)

        // Limpiar el formulario
        resetForm();
    }
}

// Función para limpiar el formulario
function resetForm() {
    carnetInput.value = '';
    fullNameInput.value = '';
    duiInput.value = '';
    nitInput.value = '';
    birthDateInput.value = '';
    emailInput.value = '';
    ageInput.value = '';
    carnetInput.focus();
}

// Eventos de los botones
submitBtn.addEventListener('click', validateForm);
resetBtn.addEventListener('click', resetForm);

// Enfocar el primer campo al cargar la página
window.onload = function() {
    carnetInput.focus();
};

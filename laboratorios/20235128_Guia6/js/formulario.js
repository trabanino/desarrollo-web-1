// Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

// Componente modal
const idModal = document.getElementById("idModal");

// Arreglo global de pacientes
let arrayPaciente = [];

// variable global para el índice del paciente en edición
let editIndex = null; // cambio realizado

/*
Creando una función para que limpie el formulario
siempre que se cargue la página o cuando se presione
el botón limpiar del formulario
*/

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();

    // restablecer el índice de edición
    editIndex = null; // cambio realizado
};

/*
Función para validar el ingreso del paciente
*/

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
            ? "Hombre"
            : inputRdFemenino.checked == true
                ? "Mujer"
                : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        const pacienteData = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];

        if (editIndex !== null) {
            // actualizar paciente existente
            arrayPaciente[editIndex] = pacienteData;
            mensaje.innerHTML = "Paciente actualizado correctamente";
            editIndex = null; // cambio realizado
        } else {
            // agregando información al arreglo paciente
            arrayPaciente.push(pacienteData);
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        }

        // llamando al componente de Bootstrap
        toast.show();

        // limpiando formulario
        limpiarForm();

        // mostrar la tabla actualizada
        imprimirPacientes(); // cambio realizado
    } else {
        // asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        // llamando al componente de Bootstrap
        toast.show();
    }
};

// función que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let $fila = "";

    arrayPaciente.forEach((element, index) => {
        $fila += `<tr>
            <td scope="row" class="text-center fw-bold">${index + 1}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td>
                <button type="button" class="btn btn-primary" data-action="edit" data-index="${index}" alt="Editar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-danger" data-action="delete" data-index="${index}" alt="Eliminar">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
    });
    return $fila;
    // cambio realizado: se agregaron atributos data-action y data-index
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col" class="text-center" style="width:5%">#</th>
                    <th scope="col" class="text-center" style="width:15%">Nombre</th>
                    <th scope="col" class="text-center" style="width:15%">Apellido</th>
                    <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                    <th scope="col" class="text-center" style="width:10%">Sexo</th>
                    <th scope="col" class="text-center" style="width:10%">País</th>
                    <th scope="col" class="text-center" style="width:25%">Dirección</th>
                    <th scope="col" class="text-center" style="width:10%">Opciones</th>
                </tr>
            </thead>
            <tbody>
                ${imprimirFilas()}
            </tbody>
        </table>
    </div>`;

    document.getElementById("idTablaPacientes").innerHTML = $table;

    // delegación de eventos para los botones de editar y eliminar
    // cambio realizado
};

// agregar evento al contenedor de la tabla (delegación de eventos)
// cambio realizado
document.getElementById("idTablaPacientes").addEventListener('click', function(event) {
    const target = event.target.closest('button');
    if (target) {
        const action = target.getAttribute('data-action');
        const index = target.getAttribute('data-index');
        if (action === 'edit') {
            editPaciente(index);
        } else if (action === 'delete') {
            deletePaciente(index);
        }
    }
});

// función para eliminar un paciente
function deletePaciente(index) {
    arrayPaciente.splice(index, 1);
    imprimirPacientes();

    mensaje.innerHTML = "Paciente eliminado correctamente";
    toast.show();
    // cambio realizado: función deletePaciente implementada
}

// función para editar un paciente
function editPaciente(index) {
    const paciente = arrayPaciente[index];

    // cargar datos en el formulario
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];

    inputRdMasculino.checked = paciente[3] === "Hombre";
    inputRdFemenino.checked = paciente[3] === "Mujer";

    // seleccionar el país correspondiente
    cmbPais.value = Array.from(cmbPais.options).find(option => option.text === paciente[4]).value;

    inputDireccion.value = paciente[5];

    // establecer el índice del paciente en edición
    editIndex = index;
    // cambio realizado: función editPaciente implementada
}

// Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        // Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        // Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "País agregado correctamente";
        // Llamando al componente de Bootstrap
        toast.show();
    } else {
        // Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        // Llamando al componente de Bootstrap
        toast.show();
    }
};

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Se agrega el focus en el campo nombre país del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Ejecutar función al momento de cargar la página HTML
limpiarForm();

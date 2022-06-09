const btnEnviar = document.getElementById("btnEnviar");
const inputNombre = document.getElementById("inputNombre");
const inputApellido = document.getElementById("inputApellido");
const inputEdad = document.getElementById("inputEdad");
const inputPassword = document.getElementById("inputPassword");
const selectGenero = document.getElementById("selectGenero");
const selectArea = document.getElementById("selectArea");
const tablaSalidas = document.getElementById("tablaSalidas");
const conteoFront = document.getElementById("conteoFront");
const conteoBack = document.getElementById("conteoBack");
const conteoMultimedia = document.getElementById("conteoMultimedia");
const conteoMarketing = document.getElementById("conteoMarketing");
const conteoOtras = document.getElementById("conteoOtras");
const formulario = document.getElementById("formRegistro");
const btnVaciar = document.getElementById("btnVaciar");
let registroActual = 0, cantidadFrontend = 0, cantidadBackend = 0, cantidadMultimedia = 0, cantidadMarketing = 0, cantidadOtros = 0;
let database = window.localStorage;

consultarLocalStorage();

btnVaciar.addEventListener("click", function () {
    database.clear();
    location.reload();
});


btnEnviar.addEventListener("click", function (event) {
    event.preventDefault();
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let edad = inputEdad.value;
    let password = inputPassword.value;
    //let genero = selectGenero.options[selectGenero.selectedIndex].value;
    //let genero = selectGenero.value;
    let genero = selectGenero.options[selectGenero.selectedIndex].innerText;
    let area = selectArea.options[selectArea.selectedIndex].innerText;
    //console.log(`${nombre}, ${apellido}, ${edad}, ${password}, ${genero}, ${area}`);
    validarDatos(nombre, apellido, edad, password, genero, area);
    formulario.reset();
});

function validarDatos(nombre, apellido, edad, password, genero, area) {
    if (nombre == "" || apellido == "" || edad == "" || password == "" || genero == "Género" || area == "Área") {
        mostrarAlerta(false);
    }
    else {
        mostrarAlerta(true);
        registroActual++;
        guardarDatos(registroActual, nombre, apellido, edad, password, genero, area);
    }
}

function guardarDatos(registroActual, nombre, apellido, edad, password, genero, area) {
    var persona = {
        id: registroActual,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        password: password,
        genero: genero,
        area: area
    }
    database.setItem(registroActual, JSON.stringify(persona));
    database.setItem("cantidadDeRegistros", registroActual);
    imprimirDatos(persona);
}

function imprimirDatos(persona) {
    tablaSalidas.innerHTML += `<tr class="row">
    <th class="col-12 col-lg-2">${persona.id}</th>
    <td class="col-12 col-lg-2">${persona.nombre}</td>
    <td class="col-12 col-lg-2">${persona.apellido}</td>
    <td class="col-12 col-lg-2">${persona.edad}</td>
    <td class="col-12 col-lg-2">${persona.genero}</td>
    <td class="col-12 col-lg-2">${persona.area}</td>
    </tr>`;
    sumarArea(persona.area);
}

function sumarArea(area) {
    if (area == "Frontend") {
        cantidadFrontend++;
        conteoFront.innerText = cantidadFrontend;
    }
    else if (area == "Backend") {
        cantidadBackend++;
        conteoBack.innerText = cantidadBackend;
    }
    else if (area == "Multimedia") {
        cantidadMultimedia++;
        conteoMultimedia.innerText = cantidadMultimedia;
    }
    else if (area == "Marketing Manager") {
        cantidadMarketing++;
        conteoMarketing.innerText = cantidadMarketing;
    }
    else {
        cantidadOtros++;
        conteoOtras.innerText = cantidadOtros;
    }
}

function mostrarAlerta(flag) {
    const alerta = document.getElementById("id-alert");
    if (alerta == null) {
        btnEnviar.disabled = true;
        let divAlert = document.createElement("div");
        let agregarId = divAlert.setAttribute("id", "id-alert");
        if (flag) {
            var agregarClases = divAlert.className = "alert alert-success";
            var textContainerAlert = document.createTextNode("¡Datos Registrados");
        }
        else {      
            var agregarClases = divAlert.className = "alert alert-warning";
            var textContainerAlert = document.createTextNode("¡Verifica que los campos no estén vacíos");
        }
        divAlert.appendChild(textContainerAlert);
        const divAvisos = document.getElementById("divAvisos");
        divAvisos.appendChild(divAlert);

        const alerta = document.getElementById("id-alert");
        setTimeout(() => {
            divAvisos.removeChild(alerta);
            btnEnviar.disabled = false;
        }, 3000);
    }




}

function consultarLocalStorage() {
    let cantidadDeRegistros = parseInt(database.getItem("cantidadDeRegistros"));
    if (cantidadDeRegistros > 0) {
        registroActual = cantidadDeRegistros;
        let claves = Object.keys(database).sort(function (a, b) { return a - b });
        for (let i = 0; i < claves.length; i++) {
            var persona = JSON.parse(database.getItem(claves[i]));
            if (typeof (persona) != "number") {
                imprimirDatos(persona);
            }
        }
    }
}
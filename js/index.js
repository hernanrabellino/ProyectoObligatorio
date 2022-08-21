function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function redirect() {
    window.location.href = "main.html"
}

function validarFormulario(evento) {
    let email = document.getElementById('floatingEmail').value;
    let password = document.getElementById('floatingPassword').value;
    if (email.length == 0 || password.length == 0) {
        evento.preventDefault();
        showAlertError();
        return;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let formulario = document.getElementById("formulario")
    formulario.addEventListener('submit', validarFormulario);
});

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function redirect() {
    window.location.href = "main.html"
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("loginbutton").addEventListener("click", function(evento) {
        let email = document.getElementById('floatingEmail').value;
        let password = document.getElementById('floatingPassword').value;
        localStorage.setItem("userName", email);
        if (email.length == 0 || password.length == 0) {
            evento.preventDefault();
            showAlertError();
            return 
    }});
});

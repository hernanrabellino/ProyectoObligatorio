document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("profileForm");
    let container = document.getElementById("container")
    if (!localStorage.getItem("userName")) {
        form.hidden = true;
        container.innerHTML = `
            <div class="alert alert-danger" role="alert">
            Para ver tu perfil debes <a href="index.html">Iniciar Sesión<a>
        </div>
        `
        return
    }

    if (!localStorage.getItem("wallpaper")) {
        let img = document.getElementById("tableBanner")
        img.src = "img/img_perfil.png"
    }

    if (!localStorage.getItem("user")) {
        let user =
        {
            name: "",
            secondName: "",
            lastName: "",
            secondLastName: "",
            emailValue: "",
            contact: "",
        }
        localStorage.setItem("user", JSON.stringify(user));

    }

    let user = JSON.parse(localStorage.getItem("user"))
    form.firstName.value = user.name
    form.secondName.value = user.secondName
    form.lastName.value = user.lastName
    form.secondLastName.value = user.secondLastName
    form.emailValue.value = localStorage.getItem("userName")
    form.contact.value = user.contact

    console.log(user)


    form.addEventListener("submit", () => {
        let user = JSON.parse(localStorage.getItem("user"))
        user.name = form.firstName.value
        user.secondName = form.secondName.value
        user.lastName = form.lastName.value
        user.secondLastName = form.secondLastName.value
        user.emailValue = form.emailValue.value
        user.contact = form.contact.value
        localStorage.setItem("user", JSON.stringify(user));


    })
    profilePicture()
});


function profilePicture() {
    document.getElementById('file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            // convert file to base64 String
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            // store file
            localStorage.setItem('wallpaper', base64String);
            // display image
            let img = document.getElementById("tableBanner")
            img.src = `data:image/png;base64,${base64String}`
        };

        reader.readAsDataURL(file);

    })
};

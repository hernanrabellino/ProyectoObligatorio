document.addEventListener("DOMContentLoaded", () => {
  let nav = document.createElement("nav");
  let htmlContentToAppend = ""
  let myProfile = ""

  if (localStorage.getItem("userName")) {
    myProfile = `<a class="nav-link dropdown-toggle" href="" id="navbarDarkDropdownMenuLink" role="button" 
   data-bs-toggle="dropdown" aria-expanded="false"><i class="far fa-user fa-2xs mx-1"></i>${formatName(localStorage.getItem("userName"))}</a>`
  }
  else {
    myProfile = `<li class="nav-item">
    <a class="nav-link" href="index.html">Iniciar Sesión</a>
  </li>`
  }
  nav.classList = "navbar navbar-expand-lg navbar-dark bg-dark p-1"
  nav.innerHTML = `
  <div class="container">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav w-100 justify-content-between">
        <li class="nav-item">
          <a class="nav-link" href="main.html">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="categories.html">Categorías</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="sell.html">Vender</a>
        </li>
        <li class="nav-item dropdown">
            ${myProfile}
            <ul class="dropdown-menu dropdown-menu-dark bg-dark" aria-labelledby="navbarDarkDropdownMenuLink">
              <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
              <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
              <li><a class="dropdown-item" onclick="localStorage.removeItem('userName')" href="index.html">Cerrar Sesión</a></li>
            </ul>
          </li>
      </ul>
    </button>
        </div>
      </div>
    </nav>
    `
  document.getElementsByTagName("body")[0].insertAdjacentElement("beforebegin", nav);
});
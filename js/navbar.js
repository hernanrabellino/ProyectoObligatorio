document.addEventListener("DOMContentLoaded", () => {
  let nav = document.createElement("nav");
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
        
        <li class="nav-item">
          <a id="user" class="nav-link" href="my-profile.html"></a>
        </li>
      </ul>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${localStorage.getItem("userName")}
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
            <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
            <li><a class="dropdown-item" href="index.html">Cerrar Sesión</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  </div>`
  document.getElementsByTagName("body")[0].insertAdjacentElement("beforebegin", nav);
});
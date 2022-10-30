let cartItems = []

document.addEventListener("DOMContentLoaded", async () => {
  const resultObj = await getJSONData(CART_INFO_URL + 25801 + EXT_TYPE);
  if (resultObj.status === "ok") {
    resultObj.data;
    cartItems = resultObj.data.articles
    showCartItems(resultObj.data)
    updateSubtotal();
    selectPayMethod();

    document.getElementById('count').addEventListener("input", (e) => {
      updateSubtotal();

    })

  }
  document.getElementById('form').addEventListener('input', (e) => {
    updateSubtotal();
    selectPayMethod();
    checkEmptyPayment();
  })
});



function updateSubtotal() {
  let countValue = document.getElementById('count').value;
  let unitCost = cartItems[0].unitCost
  let subtotalElement = document.getElementById('subtotal');
  let costSubtotalElement = document.getElementById('costSubtotal');
  let form = document.getElementById('form');
  let subtotalCost = 0;
  subtotalCost = (unitCost * countValue);


  let shippingCost = 0;
  for (let i = 0; i < form.gridRadios.length; i++) {
    let radio = form.gridRadios[i];
    if (radio.checked) {
      shippingCost = radio.value * (unitCost * countValue);
    }
  }
  subtotalElement.innerHTML = "USD " + subtotalCost;
  costSubtotalElement.innerHTML = "USD " + subtotalCost;
  document.getElementById('shippingCost').innerHTML = "USD " + shippingCost;
  document.getElementById('total').innerHTML = "USD " + (shippingCost + subtotalCost);

}



function showCartItems(cart) {
  let htmlContentToAppend = "";
  for (let i = 0; i < cart.articles.length; i++) {
    let article = cart.articles[i];
    htmlContentToAppend += `
    <div class="container px-3 my-5 clearfix">
    <div class="card">
        <div class="card-header">
            <h2>Carrito de Compras</h2>
        </div>
        <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="text-center py-3 px-4" style="min-width: 400px;">Nombre del Producto</th>
                    <th class="text-right py-3 px-4" style="width: 100px;">Precio</th>
                    <th class="text-center py-3 px-4" style="width: 120px;">Cantidad</th>
                    <th class="text-right py-3 px-4" style="width: 100px;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  
                <tr>
                <td class="p-4">
                  <div class="media align-items-center">
                    <img src="${article.image}" class="d-block ui-w-40 ui-bordered mr-4" alt="">
                    <div class="media-body">
                      <p class="d-block fs-1">${article.name}</p>
                      <small>
                      </small>
                    </div>
                  </div>
                </td>
                <td class="text-right font-weight-semibold align-middle p-4">${article.currency + " " + article.unitCost}</td>
                <td class="align-middle p-4"><input type="number" class="form-control text-center" id="count" value="${article.count}" min="1"></td>
                <td class="text-right font-weight-semibold align-middle p-4" id="subtotal">${article.currency} ${article.unitCost * article.count}</td>
              </tr>
              
              </tbody>
              <div class="float-right">
              <button type="button" class="btn btn-lg btn-default md-btn-flat mt-2 mr-3" value="Continuar Comprando">Continuar Comprando</button>
            </div>
          </div>
       </div>
    </div>
  </div>
            `
  }

  document.getElementById("cart").innerHTML = htmlContentToAppend;
}



function selectPayMethod() {
  if (document.getElementById("creditCardRadio").checked) {
    document.getElementById("bankAccount").disabled = true
    document.getElementById("creditCard").disabled = false
    document.getElementById("securityCode").disabled = false
    document.getElementById("expiration").disabled = false

    document.getElementById("creditCard").required = true
    document.getElementById("securityCode").required = true
    document.getElementById("expiration").required = true
    document.getElementById("bankAccount").required = false


  }
  if (document.getElementById("bank").checked) {
    document.getElementById("creditCard").disabled = true
    document.getElementById("securityCode").disabled = true
    document.getElementById("expiration").disabled = true
    document.getElementById("bankAccount").disabled = false

    document.getElementById("creditCard").required = false
    document.getElementById("securityCode").required = false
    document.getElementById("expiration").required = false
    document.getElementById("bankAccount").required = true


  }
}


function checkEmptyPayment() {
  let creditCardInputs = document.getElementsByClassName("paymentInput")
  let bankAccount = document.getElementById("bankAccount")

  if (document.getElementById("creditCardRadio").checked) {
    for (let i = 0; i < creditCardInputs.length; i++) {
      let creditCardInputsLength = creditCardInputs[i].value.length
      if (creditCardInputsLength <= 0) {
        document.getElementById("errorMessagePayment").classList.remove("d-none")
      }
      else {
        document.getElementById("errorMessagePayment").classList.add("d-none")
      }
    }

  }
  if (document.getElementById("bank").checked) {
    if (bankAccount.value.length <= 0) {
      document.getElementById("errorMessagePayment").classList.remove("d-none")
    }
    else {
      document.getElementById("errorMessagePayment").classList.add("d-none")
    }
  }
}

(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
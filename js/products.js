
function showProductList(Array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < Array.length; i++) {
        let product = Array[i];
        
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src=" ${product.image} " alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${product.name} - ${product.currency} ${product.cost} </h4> 
                        <p> ${product.description} </p> 
                        </div>
                        <small class="text-muted"> ${product.soldCount} artículos </small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("product-list").innerHTML = htmlContentToAppend;
        console.log(Array)
    }
}


document.addEventListener("DOMContentLoaded", async () => {
    const resultObj = await getJSONData(CAR_LIST);
    if (resultObj.status === "ok") {
    let showProductsArray = resultObj.data.products;
      showProductList(showProductsArray);
    }
});
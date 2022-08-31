// Variables for sortProducts
// const ORDER_ASC_BY_NAME = "AZ";
// const ORDER_DESC_BY_NAME = "ZA";
// const ORDER_BY_PROD_SOLDCOUNT = "Cant.";
// ------------------------------------------------------
let catName = "";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
// ------------------------------------------------------

function showProductList() {
    let htmlContentToAppend = "";

    document.getElementById("subtitle").innerHTML = `<p> Verás aquí todos los productos de la categoría ${catName} </p>`

    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action product">
            <div class="row">
                <div class="col-3">
                    <img src=" ${product.image} " alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${product.name} - ${product.currency} ${product.cost} </h4> 
                        <p class="desc"> ${product.description} </p> 
                        </div>
                        <small class="text-muted"> ${product.soldCount} artículos </small> 
                    </div>

                </div>
            </div>
        </div>
        `
            document.getElementById("product-list").innerHTML = htmlContentToAppend;
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const resultObj = await getJSONData(url);
    if (resultObj.status === "ok") {
        currentProductsArray = resultObj.data.products;
        catName = resultObj.data.catName;
        showProductList();
    }
});


function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductList();
}

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLDCOUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}


document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_COST);
});

document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_COST);
});

document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
});

document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductList();
});

document.getElementById("rangeFilterCount").addEventListener("click", function () {


    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
        minCount = parseInt(minCount);
    }
    else {
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
        maxCount = parseInt(maxCount);
    }
    else {
        maxCount = undefined;
    }

    showProductList();
});


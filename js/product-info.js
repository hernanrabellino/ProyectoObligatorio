let commentsArray = [];

document.addEventListener("DOMContentLoaded", async () => {
    const resultObj = await getJSONData(PRODUCTS_INFO);
    if (resultObj.status === "ok") {
        resultObj.data;
        // console.log(resultObj.data)
        showProductInfo(resultObj.data);
        relatedProducts(resultObj.data)
    }
    const result = await getJSONData(COMMENTS_URL);
    if (result.status === "ok") {
        const commentsArray = result.data;
        // console.log(commentsArray)
        showComments(commentsArray);
    }
}
);

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function showProductInfo(product) {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <div class="mb-1">
        <h1> ${product.name}</h1>
     <hr>
        <b class="fs-5"> Precio </b>
            <p>${product.currency} ${product.cost}</p>
        <b class="fs-5"> Descripcion </b>
            <p class="desc"> ${product.description}</p> 
        <b class="fs-5"> Categoria </b>
            <p> ${product.category} </p> 
        <b class="fs-5"> Cantidad de vendidos </b>
            <p>${product.soldCount}</p> 
     </div>
     <b class="fs-5">
     Imagenes Ilustrativas
     </b>
        `
    console.log(product);
    for (let i = 0; i < product.images.length; i++) {
        htmlContentToAppend += `
            <div class="d-inline-block mt-2">
            <img class="p-2" style="width: 25rem" src="${product.images[i]}"
            </div>
            `

    }
    document.getElementById("product").innerHTML = htmlContentToAppend;
}

function relatedProducts(product) {
    let htmlContentToAppend = "";
    for (let i = 0; i < product.relatedProducts.length; i++) {
        let relatedProduct = product.relatedProducts[i];
        console.log(relatedProduct)
        htmlContentToAppend += `
    <div class="mb-1 list-group-item-action my-2" onclick="setProductID(${relatedProduct.id})">
        <h3 class="mb-3"> ${relatedProduct.name}</h2>    
        <img class="p-2" style="width: 25rem" src="${relatedProduct.image}">
     </div>
        `
    }
    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

const rating = {
    1: `<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>`,
    2: `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>`,
    3: `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>`,
    4: `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>`,
    5: `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>`
}

function showComments(commentsArray) {
    let htmlContentToAppend = "";
    for (let i = 0; i < commentsArray.length; i++) {
        const comments = commentsArray[i];
        htmlContentToAppend += `
    <div class="list-group-item rounded-2" style="width: 95%;">
            <div class="row">
                <div class="col-3">
                    <p> <b> ${formatName(comments.user)}</b> - ${comments.dateTime} - ${rating[comments.score]}</p>
                    <small class="text-muted"> ${comments.description}</small>
                </div>
            </div>
        </div>
    `
        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
}

function formatName(str) {
    let resultStr = '';
    for (let token of str.split('_')) {
        token = token.charAt(0).toUpperCase() + token.slice(1);
        resultStr += " " + token;
    }
    return resultStr;
};


const addCommentBtn = document.getElementById("sendCommentBtn");
const textarea = document.getElementById("commentArea");
const selectScore = document.getElementById("rating");
const newComments = document.getElementById("newComments")

addCommentBtn.addEventListener("click", (evt) => {
    let date = new Date();
    if (textarea.value) localStorage.setItem("comment", textarea.value);
    if (localStorage.getItem("comment")) {
        evt.preventDefault();
        let userName = localStorage.getItem("userName");
        let description = localStorage.getItem("comment");
        let score = selectScore.value
        newComments.innerHTML += `
        <div class="list-group-item rounded-2" style="width: 95%;">
                <div class="row">
                    <div class="col-3">
                        <p> <b>${formatName(userName)}</b> - ${date.toISOString().split('T')[0]} ${date.toLocaleTimeString()} - ${rating[score]}</p>
                        <small class="text-muted"> ${description}</small>
                    </div>  
                </div>
            </div>`
    }
    localStorage.setItem('comment', "");
});

// Al dar click al boton enviar se va a guardar la fecha actual en date,
// el mensaje que se haya ingresado en el textarea se va a guardar en el localstorage
// y se va a guardar en la variable score la valoracion que le hayas puesto
// todas esas cosas se van agregar en el div con id newComments 
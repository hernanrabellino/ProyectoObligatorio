
// variables for sortCategories and sortProducts
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_ASC_BY_COST = "AscCost";
const ORDER_DESC_BY_COST = "DescCost";
const ORDER_BY_PROD_COUNT = "Count.";
const ORDER_BY_PROD_SOLDCOUNT = "Sold.";
// -------------------------------------------------

const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const url = PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE;

const PRODUCTS_INFO = PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE;

const COMMENTS_URL = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE

const CART_INFO = CART_INFO_URL + 25801 + EXT_TYPE;

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}


let getJSONData = async function (url) {
  let result = {};
  // showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      // hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      // hideSpinner();
      return result;
    });
}

function formatName(str) {
  if (str.includes('@')) {
      return str.split('@')[0] }
  let resultStr = '';
  for (let token of str.split('_')) {
      token = token.charAt(0).toUpperCase() + token.slice(1);
      resultStr += " " + token;
  }
  return resultStr;
};



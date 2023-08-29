//===========================================================
import { filter, pagination, colorsFilter, colorsFiltering, sizesFilter, sizesFiltering, modalClose, redirectPage, searchFilter, searcgCatalogValue, menuBurger } from "./functions.js";

const el = (selector) => document.querySelector(selector);
const all = (selectorAll) => document.querySelectorAll(selectorAll);


// import of a file with a product catalog
async function req(url) {
  const data = await fetch(url)
  return await data.json()
}

req('/public/product-list.json')
  .then((json) => outJson(json))
  .catch((e) => console.error('error'))


let product = []

// json processing function
function outJson(json) {

  product = json

  let productType = JSON.parse(localStorage.getItem("__product__"));

  if (productType === 'shorts') {
    // product selection by type
    const shorts = filter(json, "productType", "shorts");

    // output of product cards
    pagination(shorts)

    // colors filter function for sidebar
    colorsFilter(shorts);

    // product color selection function
    const filteringColor = (e) => colorsFiltering(e, shorts)
    el('#openColor').addEventListener("click", filteringColor)

    // sizes filter function for sidebar
    sizesFilter(shorts);

    // product size selection function
    const filteringSize = (e) => sizesFiltering(e, shorts)
    el('#openSize').addEventListener("click", filteringSize)

    // breadcrumbs
    el('.breadcrumbs-end').innerText = 'shorts'

    // search function in catalog
    el('.catalog__search-inp').addEventListener('input', (e) => {
      let searchCatalogValue = e.target.value
      searcgCatalogValue(searchCatalogValue, shorts)
    })

  }

  else if (productType === 'pants') {
    const pants = filter(json, "productType", "pants");

    pagination(pants)

    colorsFilter(pants);

    const filteringColor = (e) => colorsFiltering(e, pants)
    el('#openColor').addEventListener("click", filteringColor)

    sizesFilter(pants);

    const filteringSize = (e) => sizesFiltering(e, pants)
    el('#openSize').addEventListener("click", filteringSize)


    // breadcrumbs
    el('.breadcrumbs-end').innerText = 'pants'


    // search function in catalog
    el('.catalog__search-inp').addEventListener('input', (e) => {
      let searchCatalogValue = e.target.value
      searcgCatalogValue(searchCatalogValue, pants)
    })

  }

  else { // functions get search global

    pagination(productType)

    colorsFilter(productType);

    const filteringColor = (e) => colorsFiltering(e, productType)
    el('#color').addEventListener("click", filteringColor)

    sizesFilter(productType);

    const filteringSize = (e) => sizesFiltering(e, productType)
    el('#size').addEventListener("click", filteringSize)

    // breadcrumbs
    el('.breadcrumbs-end').innerText = 'search'

  }
}


// calling of function redirection
el('[data-tab="shorts"]').addEventListener('click', (e) => {
  redirectPage(e.target.dataset.tab)
})
el('[data-tab="pants"]').addEventListener('click', (e) => {
  redirectPage(e.target.dataset.tab)
})


// open side menu
all(".aside__chapter").forEach((item) => {
  item.addEventListener("click", function (event) {
    this.nextElementSibling.classList.toggle("active");
  });
});


// mobile menu active
el(".burger").addEventListener("click", menuBurger);
el(".header__underlay").addEventListener("click", menuBurger);


// close modal window function
el('.modal').addEventListener('click', modalClose)


// search set function global
let searchValue = ''
let datalist = el('.header__search-list')

el('.header__search-inp').addEventListener('input', (e) => {
  searchValue = e.target.value
  datalist.innerHTML = ''
  searchFilter(searchValue, product, datalist)
})
el('.header__search-btn').addEventListener('click', () => {
  window.location.href = '/catalog.html';
  searchFilter(searchValue, product, datalist)
})
el('.header__search-inp').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    window.location.href = '/catalog.html';
    searchFilter(searchValue, product, datalist)
  }
})
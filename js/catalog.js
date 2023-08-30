//===========================================================
import { filter, launch, modalClose, redirectPage, searchFilter, menuBurger } from "./functions.js";

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

  switch (productType) {
    case 'shorts':
      const shorts = filter(json, "productType", "shorts");
      launch(shorts)
      // breadcrumbs
      el('.breadcrumbs-end').innerText = 'shorts'
      break
    case 'pants':
      const pants = filter(json, "productType", "pants");
      launch(pants)
      el('.breadcrumbs-end').innerText = 'pants'
      break
    case 'shirts':
      const shirts = filter(json, "productType", "shirts");
      launch(shirts)
      el('.breadcrumbs-end').innerText = 'shirts'
      break
    case 'accessories':
      const accessories = filter(json, "productType", "accessories");
      launch(accessories)
      el('.breadcrumbs-end').innerText = 'accessories'
      break
    default:
      launch(productType)
      el('.breadcrumbs-end').innerText = 'search'
      break
  }
}


// calling of function redirection
el('[data-tab="shorts"]').addEventListener('click', (e) => {
  redirectPage(e.target.dataset.tab)
})
el('[data-tab="pants"]').addEventListener('click', (e) => {
  redirectPage(e.target.dataset.tab)
})
el('[data-tab="shirts"]').addEventListener('click', (e) => {
  redirectPage(e.target.dataset.tab)
})
el('[data-tab="accessories"]').addEventListener('click', (e) => {
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
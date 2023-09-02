//===========================================================
import { request, filter, launch, modalClose, callingRedirect, searchFilter, menuBurger } from "./functions.js";

const el = (selector) => document.querySelector(selector);
const all = (selectorAll) => document.querySelectorAll(selectorAll);


// import of a file with a product catalog
request('/public/product-list.json')
  .then((json) => outJson(json))
  .catch((e) => console.error('error'))


let product = []

// json processing function
function outJson(json) {

  product = json

  let productType = JSON.parse(localStorage.getItem("__product__"));

  switch (productType) {
    case 'shorts':
      // breadcrumbs
      el('.breadcrumbs-end').innerText = 'shorts'
      const shorts = filter(json, "productType", "shorts");
      launch(shorts)
      break
    case 'pants':
      el('.breadcrumbs-end').innerText = 'pants'
      const pants = filter(json, "productType", "pants");
      launch(pants)
      break
    case 'shirts':
      el('.breadcrumbs-end').innerText = 'shirts'
      const shirts = filter(json, "productType", "shirts");
      launch(shirts)
      break
    case 'accessories':
      el('.breadcrumbs-end').innerText = 'accessories'
      const accessories = filter(json, "productType", "accessories");
      launch(accessories)
      break
    default:
      launch(productType)
      el('.breadcrumbs-end').innerText = 'search'
      break
  }
}


// calling of function redirection
el('.header__nav').addEventListener('click', callingRedirect)


// open side menu
all(".filter__header").forEach((item) => {
  item.addEventListener("click", function (event) {
    this.nextElementSibling.classList.toggle("active");
  });
});


// mobile menu active
el(".burger").addEventListener("click", menuBurger);
el(".header__underlay").addEventListener("click", menuBurger);


// close modal window function
el('.md').addEventListener('click', modalClose)


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


var swiper = new Swiper(".myswiper", {
  zoom: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
});
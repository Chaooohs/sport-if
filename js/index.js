//===================================================================
import { modalClose, menuBurger, redirectPage, homepageСardFilter, searchFilter } from "./functions.js";
import { RenderCard } from "./constructor.js";

const el = (selector) => document.querySelector(selector);


// import of a file with a product catalog
async function req(url) {
  const data = await fetch(url)
  return await data.json()
}

req('./public/product-list.json')
  .then((json) => outJson(json))
  .catch((e) => console.error('error'))


let product = []

// json processing function
function outJson(json) {

  product = json

  // calling the homepage card filter and iterating through the cards for the main window
  for (let item of homepageСardFilter(product)) {
    renderElement(item)
  }

}


// outputting cards on the main page
function renderElement(item) {
  let render = new RenderCard(item)
  el(".two__cards").insertAdjacentHTML('beforeend', render.renderCatalogCard())

  // calling the modal window rendering function for main cards
  el(".two__cards").addEventListener("click", function (e) {
    if (e.target.classList.contains('card__image')) render.renderModalCard(e.target.id);
  })
}


// close modal window function
el('.modal').addEventListener('click', modalClose)


// mobile menu active
el('.burger').addEventListener('click', menuBurger)
el('.header__underlay').addEventListener('click', menuBurger)


// calling of function redirection
el('[data-button="shorts"]').addEventListener('click', (e) => {
  redirectPage(e.target.dataset.button)
})
el('[data-button="pants"]').addEventListener('click', (e) => {
  redirectPage(e.target.dataset.button)
})
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
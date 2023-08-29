//==============================================
import { RenderCard } from "./constructor.js";

const el = (selector) => document.querySelector(selector);
const all = (selectorAll) => document.querySelectorAll(selectorAll);


// function of redirection to the product catalog
export const redirectPage = (dataType) => {
  localStorage.setItem("__product__", JSON.stringify(dataType));
  window.location.href = "/catalog.html";
}

// mobile menu active
export const menuBurger = () => {
  el(".burger").classList.toggle("active");
  el("#headerNav").classList.toggle("active");
  el(".header__underlay").classList.toggle("active");
  el("body").classList.toggle("active");
}


// filter function
export function filter(arr, prop, value) {
  let result = []
  for (let item of arr) {
    if (String(item[prop]).includes(value)) result.push(item)
  }
  return result
}


// pagination function
export function pagination(arr) {
  let itemOnPage = 12;
  let itemOfPagination = Math.ceil(arr.length / itemOnPage);

  // creating pagination buttons
  el('.pagination').innerHTML = ''

  let items = [];

  for (let i = 1; i <= itemOfPagination; i++) {
    let div = document.createElement('div');
    div.innerHTML = i;
    div.classList.add('pagination__item')
    el('.pagination').appendChild(div);
    items.push(div);
  }

  showPage(items[0]);

  for (let item of items) {
    item.addEventListener('click', () => showPage(item));
  }

  function showPage(item) {

    let active = el('.pagination__item.active')

    if (active) {
      active.classList.remove('active');
    }

    item.classList.add('active');

    let pageNum = parseInt(item.innerHTML);

    let start = (pageNum - 1) * itemOnPage;
    let end = start + itemOnPage;

    let notes = arr.slice(start, end);

    el('.main').innerHTML = '';
    for (let item of notes) {
      renderElement(item);
    }
  }
}


// render function
export function renderElement(item) {

  let render = new RenderCard(item)

  // call card rendering function for directories
  el(".main").insertAdjacentHTML('beforeend', render.renderCatalogCard())

  // calling the modal window rendering function for catalog cards
  el('.main').addEventListener('click', (e) => {
    if (e.target.classList.contains('card__image')) {
      render.renderModalCard(e.target.id)
    }
  })
}


// product color selection function
let selectColor;

export function colorsFiltering(e, catalog) {

  let buttonC = e.target.closest('button');
  if (!buttonC) return;

  if (selectColor) selectColor.classList.remove('active')

  selectColor = buttonC
  selectColor.classList.add('active')

  if (e.target.classList.contains('square-all')) {
    pagination(catalog)
  }
  else {
    let colors = filter(catalog, "productColor", e.target.dataset.color);

    // if (colors[0] === undefined) {
    //   console.warn(`not found`);
    //   buttonC.disabled = true;
    //   el(".main").innerHTML = `<h2 class="not-found">not found</h2>`;
    //   return;
    // }
    pagination(colors)
  }
}


// product size selection function
let selectSize;

export function sizesFiltering(e, catalog) {

  let buttonS = e.target.closest('button');
  if (!buttonS) return;

  if (selectSize) selectSize.classList.remove('active')

  selectSize = buttonS

  selectSize.classList.add('active')

  if (e.target.classList.contains('square-all')) {
    pagination(catalog)
  }
  else {
    let sizes = filter(catalog, "productSize", e.target.dataset.size);

    // if (sizes[0] === undefined) {
    //   console.warn(`not found`);
    //   buttonS.disabled = true;
    //   el(".main").innerHTML = `<h2 class="not-found">not found</h2>`;
    //   return;
    // }
    pagination(sizes)
  }
}


// colors filter function for sidebar
export function colorsFilter(product) {

  el("#color").innerHTML = ''

  let allColors = [];

  for (let item of product) {
    allColors.push(item.productColor)
  }

  let colors = [...new Set(allColors)];

  colors.forEach((color) => {
    const button = document.createElement("button");
    button.classList.add("square-color");
    button.style.backgroundColor = `${color}`;
    button.setAttribute("data-color", `${color}`);
    el("#color").append(button);
  });
}


// sizes filter function for sidebar
export function sizesFilter(product) {

  el("#size").innerHTML = ''

  let allSizes = [];

  for (let item of product) {

    for (let el of item.productSize) {
      allSizes.push(el)
    }

  }
  // removing duplicates
  let sizes = [...new Set(allSizes)];

  // sorting array elements
  sizes.sort((a, b) => a - b);

  sizes.forEach((size) => {
    const button = document.createElement("button");
    button.classList.add("square-size");
    button.setAttribute("data-size", `${size}`);
    button.innerText = `${size}`;
    el("#size").append(button);
  });
}


// homepage card filter
export function homepageСardFilter(product) {

  let cardsProduct = [];
  for (let i = 0; i < 4; i++) {
    let cardsProductGap = Math.floor(Math.random() * product.length);
    cardsProduct.push(cardsProductGap);
  }

  let cardsProductOut = [...new Set(cardsProduct)];

  return cardsProductOut.map((index) => {
    return product[index];
  });
}


// function to calculate the cost of good in the shop cart
export function calcCostItemsSC(e) {

  const shopCart = e.target.closest('.sc-card');
  let counter = shopCart.querySelector(".sc-counter")
  let productCost = shopCart.querySelector("[data-cost]")
  let cost = shopCart.querySelector(".sc-item-price")

  if (e.target.dataset.action === "minus") {
    if (parseInt(counter.innerText) > 1) {
      counter.innerText--
      cost.innerText = +cost.innerText - +productCost.dataset.cost
    }
  }

  if (e.target.dataset.action === "plus") {
    counter.innerText++
    cost.innerText = +productCost.dataset.cost + +cost.innerText
  }
}


// function to calculate the total cost of goods in the shop cart
export function calcTotalCostSC() {

  let totalPrice = 0;

  all(".shop__card").forEach((item) => totalPrice += parseInt(item.querySelector(".sc-item-price").innerText));

  el(".sc-total-price").innerText = totalPrice.toLocaleString(); // number division
}


// counter on the header basket
export const statusShopCart = (item) => el(".header__counter").innerText = item.children.length


// shop cart window title
export const titleShopCart = (mainElement) => {
  if (mainElement.children.length > 0) el(".shop__empty").classList.add("hide");
  else el(".shop__empty").classList.remove("hide");
}


// close modal window function
export const modalClose = (e) => {
  if (e.target.closest('.md-close') || !e.target.closest('.modal__content')) {
    el(".modal").classList.add("hide");
    el("body").classList.remove("active");
  }
}


//close modal window Shop Cart function
export const modalShopClose = (e) => {
  if (e.target.closest('.sc-close') || !e.target.closest('.shop__content')) {
    el(".shop").classList.add("hide");
    el("body").classList.remove("active");
  }
}


// search set function global
export function searchFilter(value, product, datalist) {

  const rgx = new RegExp(value, 'i')
  let searchFilterData = product.filter((item) => rgx.test(item.productName)).slice(0, 10)

  for (let item of searchFilterData) {
    const option = document.createElement('option')
    option.value = item.productName
    datalist.append(option)
  }

  if (searchFilterData[0] === undefined || value === '') {
    localStorage.setItem('__product__', JSON.stringify(searchFilterData = []))
    console.warn(`not found`);
    el(".main").innerHTML = `<h2 class="not-found">not found</h2>`;
    return
  }

  localStorage.setItem('__product__', JSON.stringify(searchFilterData))
}


// search function in catalog
export function searcgCatalogValue(value, product) {

  const rgx = new RegExp(value, 'i')
  let searchFilterData = product.filter((item) => rgx.test(item.productName))

  if (searchFilterData[0] === undefined) {
    localStorage.setItem('__product__', JSON.stringify(searchFilterData = []))
    console.warn(`not found`);
    el(".main").innerHTML = `<h2 class="not-found">not found</h2>`;
    return
  }
  else if (value === '') {
    pagination(product)
  }

  pagination(searchFilterData)
}


// launch function
export function launch(product) {
  // output of product cards
  pagination(product)

  // colors filter function for sidebar
  colorsFilter(product);

  // product color selection function
  const filteringColor = (e) => colorsFiltering(e, product)
  el('#openColor').addEventListener("click", filteringColor)

  // sizes filter function for sidebar
  sizesFilter(product);

  // product size selection function
  const filteringSize = (e) => sizesFiltering(e, product)
  el('#openSize').addEventListener("click", filteringSize)

  // search function in catalog
  el('.catalog__search-inp').addEventListener('input', (e) => {
    let searchCatalogValue = e.target.value
    searcgCatalogValue(searchCatalogValue, product)
  })
}
//============================================================
import { statusShopCart, calcTotalCostSC, titleShopCart, modalShopClose, calcCostItemsSC } from "./functions.js"
import { RenderCard } from "./constructor.js";

const el = (selector) => document.querySelector(selector);
const mainElement = el(".sc__main");


// outputting cards to the shop cart
function renderElement(item) {
  let render = new RenderCard(item)
  mainElement.insertAdjacentHTML('beforeend', render.renderShopCart())
}


// get cards from local storage
let lstShopCart = []

if (localStorage.getItem('__shop-cart__')) {
  lstShopCart = JSON.parse(localStorage.getItem('__shop-cart__'))
  lstShopCart.forEach((item) => renderElement(item))
}


// set cards to local storage
function saveToLSt() {
  localStorage.setItem('__shop-cart__', JSON.stringify(lstShopCart))
}


// counter on the header basket
statusShopCart(mainElement)


window.addEventListener("click", function (e) {
  if (e.target.hasAttribute('data-add')) {

    const card = e.target.closest(".sc-card");

    let mainElementInfo = {
      id: card.dataset.id,
      productImage1: card.querySelector(".sc-image").getAttribute("src"),
      productName: card.querySelector(".sc-title").innerText,
      productCost: card.querySelector(".sc-price").innerText,
      productCounter: 1,
    };

    const shopCartElement = mainElement.querySelector(`[data-id="${mainElementInfo.id}"]`);
    if (shopCartElement) {
      return
    }
    renderElement(mainElementInfo)
    lstShopCart.push(mainElementInfo)
    saveToLSt()
  }

  // counter on the header basket
  statusShopCart(mainElement)


  // function to calculate the cost of good in the shop cart
  if (e.target.dataset.action === 'plus' || e.target.dataset.action === 'minus') {
    calcCostItemsSC(e)
  }


  // deleting a card from the shop cart
  if (e.target.closest('.sc-del')) {

    const b = e.target.closest('.sc-card')

    lstShopCart = lstShopCart.filter((item) => item.id !== b.dataset.id)

    saveToLSt()
    b.remove()
  }

  calcTotalCostSC()
  statusShopCart(mainElement)
  titleShopCart(mainElement)
});


// opening a shopping cart
el('.sc-open').addEventListener('click', function () {
  el('.sc').classList.remove('hide')
  el('body').classList.add('active')
})


// close modal window function
el('.sc').addEventListener('click', modalShopClose)
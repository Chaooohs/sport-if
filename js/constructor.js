//=========================================================
import { modalClose } from "./functions.js";

const el = (selector) => document.querySelector(selector);

// rendering of cards
export class RenderCard {
  constructor(option) {
    this.id = option.id,
      this.productName = option.productName,
      this.productCost = option.productCost,
      this.productSize = option.productSize,
      this.productColor = option.productColor,
      this.productImage1 = option.productImage1,
      this.productImage2 = option.productImage2,
      this.productImage1zoom = option.productImage1zoom,
      this.productImage2zoom = option.productImage2zoom,
      this.productCounter = option.productCounter
  }

  renderCatalogCard() {
    const card = `
          <div class="product sc-card" data-id="${this.id}" data-color="${this.productColor}">
            <img class="product__image sc-image" src="${this.productImage1}" id="${this.id}" alt="img ">
            <h4 class="product__name sc-title">${this.productName}</h4>
            <div class="product__rating">
              <img src="./img/svg/star-yellow.svg" alt="star">
              <img src="./img/svg/star-yellow.svg" alt="star">
              <img src="./img/svg/star-yellow.svg" alt="star">
              <img src="./img/svg/star-yellow.svg" alt="star">
              <img src="./img/svg/star-yellow.svg" alt="star">
            </div>
            <div class="product__price">
              <span class="product__low text_sm">As low as </span>
              <span class="product__cost text_sm">&#8372;</span>
              <span class="product__current-price sc-price">${this.productCost}</span>
            </div>
            <button class="two__btn product__btn btn_red sc_btn" data-add="${this.id}">
              <iconify-icon icon="subway:bag" width="21" height="21"></iconify-icon>
              add to cart
            </button>
          </div>
          `;
    return card
  }

  renderShopCart() {
    const card = `
          <div class="sc__card sc-card" data-id="${this.id}">
            <button class="sc__del-btn sc-del" data-del="del">
              <img src="./img/svg/cloce.svg" alt="close">
            </button>
            <img class="sc__product-image sc-image" src="${this.productImage1}" alt="${this.productName}">
            <h1 class="md__product-name sc__product-name">${this.productName}</h1>
            <span class="modal__item sc__product-id sc-id">item #${this.id}</span>
            <button class="sc__counter-remove sc-minus">
              <img src="./img/svg/minus.svg" alt="close" data-action="minus">
            </button>
            <div class="sc__counter sc-counter">${this.productCounter}</div>
            <button class="sc__counter-add sc-plus">
              <img src="./img/svg/plus.svg" alt="close" data-action="plus">
            </button>
            <span class="sc__cost text_sm modal__price">cost:</span>
            <div class="sc__product-price text_sm modal__price">
              <span class="sc__current-price sc-item-price" data-cost="${this.productCost}"> ${this.productCost}</span>
              <span> &#8372;</span>
            </div>
          </div>
          `;
    return card
  }

  renderModalCard(id) {

    // open modal window
    el(".md").classList.remove("hide");
    el("body").classList.add("active");

    // filling modal window
    if (id === this.id) {
      el(".md__content").setAttribute("data-id", `${this.id}`)
      el(".md__image").setAttribute("src", this.productImage1);
      el(".md__image").setAttribute("data-zoom", this.productImage1zoom);
      el(".md__img-front").setAttribute("src", this.productImage1);
      el(".md__img-front").setAttribute("data-zoom", this.productImage1zoom);
      el(".md__img-back").setAttribute("src", this.productImage2);
      el(".md__img-back").setAttribute("data-zoom", this.productImage2zoom);
      el(".md__product-name").innerText = this.productName;
      el(".md__product-id").innerText = this.id;
      el(".md__product-price").innerHTML = this.productCost;
      el(".md__bag").setAttribute("data-add", this.id);
      el(".md__bag").classList.add("sc_btn");
      el(".md__size-block").innerHTML = "";
      for (let size of this.productSize) {
        let div = document.createElement("div");
        div.classList.add("md__size-square");
        div.innerText = size;
        el(".md__size-block").append(div);
      }
    }
  }
}


// changing images in a modal window
el('.md__block-image').addEventListener("click", (e) => {
  if (e.target.classList.contains("md__img-back") || e.target.classList.contains("md__img-front")) {
    el(".md__image").setAttribute("src", e.target.currentSrc);
    el(".md__image").setAttribute("data-zoom", e.target.dataset.zoom);
  }
});


el('.md__image').addEventListener("click", (e) => {
  el('.md-zoom').classList.remove('hide')
  el('.md-zoom__image').setAttribute('src', e.target.dataset.zoom)
})


el('.md-zoom').addEventListener('click', (e) => {
  if (e.target.closest('.md-close')) {
    el(".md-zoom").classList.add("hide");
  }
})
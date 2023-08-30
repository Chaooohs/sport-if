//=========================================================
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
            <h1 class="modal__name-product sc__product-name">${this.productName}</h1>
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
    el(".modal").classList.remove("hide");
    el("body").classList.add("active");

    // filling modal window
    if (id === this.id) {
      el(".modal__content").setAttribute("data-id", `${this.id}`)
      el(".modal__image").setAttribute("src", this.productImage1);
      el(".modal__img-front").setAttribute("src", this.productImage1);
      el(".modal__img-back").setAttribute("src", this.productImage2);
      el(".modal__name-product").innerText = this.productName;
      el(".modal__id").innerText = this.id;
      el(".modal__price").innerHTML = this.productCost;
      el(".modal__bag").setAttribute("data-add", this.id);
      el(".modal__bag").classList.add("sc_btn");
      el(".modal__size-block").innerHTML = "";
      for (let size of this.productSize) {
        let div = document.createElement("div");
        div.classList.add("modal__size-square");
        div.innerText = size;
        el(".modal__size-block").append(div);
      }
    }
  }
}


// changing images in a modal window
el('.modal__block-image').addEventListener("click", (e) => {
  if (e.target.classList.contains("modal__img-back") || e.target.classList.contains("modal__img-front")) {
    el(".modal__image").setAttribute("src", e.target.currentSrc)
  }
});
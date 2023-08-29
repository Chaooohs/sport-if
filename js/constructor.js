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
          <div class="card sc-card" data-id="${this.id}" data-color="${this.productColor}">
            <img class="card__image sc-image" src="${this.productImage1}" id="${this.id}" alt="img ">
            <h4 class="card__title sc-title">${this.productName}</h4>
            <div class="card__stars">
              <iconify-icon icon="bi:star-fill" style="color: #ffcc48;" width="24" height="24"></iconify-icon>
              <iconify-icon icon="bi:star-fill" style="color: #ffcc48;" width="24" height="24"></iconify-icon>
              <iconify-icon icon="bi:star-fill" style="color: #ffcc48;" width="24" height="24"></iconify-icon>
              <iconify-icon icon="bi:star-fill" style="color: #ffcc48;" width="24" height="24"></iconify-icon>
              <iconify-icon icon="bi:star-fill" style="color: #ffcc48;" width="24" height="24"></iconify-icon>
            </div>
            <div class="card__spans">
              <span class="card__as text_sm">As low as </span>
              <span class="card__price text_sm">&#8372;</span>
              <span class="price sc-price">${this.productCost}</span>
            </div>
            <button class="two__btn card__btn btn_red sc_btn" data-add="${this.id}">
              <iconify-icon icon="subway:bag" width="21" height="21"></iconify-icon>
              add to cart
            </button>
          </div>
          `;
    return card
  }

  renderShopCart() {
    const card = `
          <div class="shop__card sc-card" data-id="${this.id}">
            <button class="shop__del sc-del" data-del="del">
              <iconify-icon icon="ei:close" style="color: #a04956;" width="32" height="32"></iconify-icon>
            </button>
            <img class="shop__image sc-image" src="${this.productImage1}" alt="${this.productName}">
            <h1 class="modal__name-product shop__title r-title">${this.productName}</h1>
            <span class="modal__item shop__item sc-id">item #${this.id}</span>
            <button class="shop__remove sc-minus">
              <iconify-icon icon="ic:baseline-minus" style="color: #a04956;" width="32" height="32" data-action="minus"></iconify-icon>
            </button>
            <div class="shop__counter sc-counter">${this.productCounter}</div>
            <button class="shop__add sc-plus">
              <iconify-icon icon="ic:baseline-plus" style="color: #a04956;" width="32" height="32" data-action="plus"></iconify-icon>
            </button>
            <span class="shop__cost-text text_sm modal__price">cost:</span>
            <div class="shop__cost text_sm modal__price">
              <span class="shop__price sc-item-price" data-cost="${this.productCost}"> ${this.productCost}</span>
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


// !----
const containerBox = document.querySelector(".box");
const showFirstFive = document.querySelector('.show-first-five');
const showAll = document.querySelector('.show-all');
const totalAmount = document.querySelector('#total-amount');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('#cart-total');

let cart = [];

showFirstFive.onclick = () => {
  reload(arr.slice(0, 5));
}

showAll.onclick = () => {
  reload(arr);
}

reload(arr);

function reload(data) {
  containerBox.innerHTML = "";

  for (let item of data) {
    const divBoxItem = document.createElement('div');
    divBoxItem.classList.add('box-item');

    const divItemTop = document.createElement('div');
    divItemTop.classList.add('item-top');

    const imgBag = document.createElement('img');
    imgBag.src = item.image;

    const divItemBottom = document.createElement('div');
    divItemBottom.classList.add('item-bottom');

    const h2SupTitle = document.createElement('h2');
    h2SupTitle.classList.add('sup-title');
    h2SupTitle.textContent = item.title;

    const description = document.createElement('p');
    description.classList.add('description');
    description.innerHTML = item.description.length > 80 ? item.description.slice(0, 80) + " <b>more...</b>" : item.description

    const divSubTitle = document.createElement('div');
    divSubTitle.classList.add('sub-title');

    const divTitlePrice = document.createElement('div');
    divTitlePrice.classList.add('title-price', 'title-item');

    const imgPrice = document.createElement('img');
    imgPrice.src = 'img/price.svg';

    const spanPrice = document.createElement('span');
    spanPrice.textContent = item.price;

    const divTitleRating = document.createElement('div');
    divTitleRating.classList.add('title-rating', 'title-item');

    const imgRating = document.createElement('img');
    imgRating.src = 'img/rating.svg';

    const spanRating = document.createElement('span');
    spanRating.textContent = item.rating.rate;

    const divTitleCount = document.createElement('div');
    divTitleCount.classList.add('title-count', 'title-item');

    const imgCount = document.createElement('img');
    imgCount.src = 'img/count.svg';

    const spanCount = document.createElement('span');
    spanCount.textContent = item.rating.count;

    const buttonFavorite = document.createElement('button');
    buttonFavorite.textContent = 'В избранное';

    containerBox.append(divBoxItem);
    divBoxItem.append(divItemTop);
    divItemTop.append(imgBag);
    divBoxItem.append(divItemBottom);
    divItemBottom.append(h2SupTitle);
    divItemBottom.append(description);
    divItemBottom.append(divSubTitle);
    divSubTitle.append(divTitlePrice);
    divTitlePrice.append(imgPrice);
    divTitlePrice.append(spanPrice);
    divSubTitle.append(divTitleRating);
    divTitleRating.append(imgRating);
    divTitleRating.append(spanRating);
    divSubTitle.append(divTitleCount);
    divTitleCount.append(imgCount);
    divTitleCount.append(spanCount);
    divItemBottom.append(buttonFavorite);

    buttonFavorite.onclick = () => {
      if (cart.includes(item.id)) {
        buttonFavorite.classList.remove('active-btn');
        buttonFavorite.innerHTML = 'В избранное';

        cart = cart.filter(id => id !== item.id);
      } else {
        buttonFavorite.classList.add('active-btn');
        buttonFavorite.innerHTML = 'Добавлено';
        cart.push(item.id);
      }

      totalAmount.innerHTML = cart.length;
      cart_reload(cart);
      updateCartItems();
      updateCartTotal();
    }
  }
}

function cart_reload(ids) {
  for (let id of ids) {
    for (let product of arr) {
      if (id === product.id) {
        console.log(product);
      }
    }
  }
}

function updateCartItems() {
  cartItemsContainer.innerHTML = "";

  for (let id of cart) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const product = arr.find(item => item.id === id);

    const img = document.createElement('img');
    img.src = product.image;
    img.classList.add('cart-item-image');

    const title = document.createElement('h3');
    title.textContent = product.title;
    title.classList.add('cart-item-title');

    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('cart-item-quantity');

    const quantityLabel = document.createElement('span');
    quantityLabel.textContent = 'Количество:';
    quantityLabel.classList.add('cart-item-quantity-label');

    const quantity = document.createElement('input');
    quantity.type = 'number';
    quantity.value = 1;
    quantity.min = 1;
    quantity.classList.add('cart-item-quantity-input');

    quantity.onchange = () => {
      const newQuantity = parseInt(quantity.value);
      updateCartItemQuantity(id, newQuantity);
      updateCartTotal();
    }

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Удалить';
    removeButton.classList.add('cart-item-remove-btn');

    removeButton.onclick = () => {
      removeCartItem(id);
      updateCartItems();
      updateCartTotal();
    }

    cartItemsContainer.append(cartItem);
    cartItem.append(img);
    cartItem.append(title);
    cartItem.append(quantityContainer);
    quantityContainer.append(quantityLabel);
    quantityContainer.append(quantity);
    cartItem.append(removeButton);
  }
}

function updateCartItemQuantity(id, quantity) {
  
  console.log(`Item ${id}: new quantity - ${quantity}`);
}

function removeCartItem(id) {
  cart = cart.filter(itemId => itemId !== id);
}

function updateCartTotal() {
  let total = 0;

  for (let id of cart) {
    const product = arr.find(item => item.id === id);
    total += product.price;
  }

  cartTotal.textContent = total.toFixed(2);
}

cart_reload(cart);
updateCartItems();
updateCartTotal();

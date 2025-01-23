import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOption } from '../data/deliveryOption.js';

const today = dayjs();

const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D')); // Example for a test delivery date

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // Find the matching product for the cart item
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  // Find the matching delivery option for the cart item
  let matchingDeliveryOption;
  deliveryOption.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchingDeliveryOption = option;
    }
  });

  if (matchingDeliveryOption) {
    // Calculate the delivery date for the selected delivery option
    const today = dayjs();
    const deliveryDate = today.add(
      matchingDeliveryOption.deliveryDate, // Fixed to use the matched delivery option
      'days'
    );

    const dateString = deliveryDate.format('dddd, MMMM D');

    // Build the cart summary HTML
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  } else {
    console.log('No matching delivery option found for cartItem:', cartItem);
  }
});

// Function to build the delivery options HTML
function deliveryOptionHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOption.forEach((deliveryOption) => {
    // Calculate delivery date for each option
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDate,
      'days'
    );

    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCent === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCent)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    // Build the delivery option HTML
    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

// Render the cart summary to the DOM
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// Add event listeners to delete buttons
document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
    });
  });

document.querySelectorAll('.js-delivery-option')
.forEach((element) => {
  element.addEventListener('click', () => {
    const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});

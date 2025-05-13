// I totally didn't have to do this but 
// I really wanted to try my hand at JS to get the result I wanted (kinda) 
// and its hard!
let slideIndex = 0;
const slides = document.querySelectorAll(".slides");
const promoMessages = [
  '🌟 Use code <strong>GLOW20</strong> for 20% off! ✨',
  '🎁 Buy 2, Get 1 Free on gift sets! 🆓',
  '🚢 Free shipping over $50 — Today Only! 📦'
];
const textMessages = [
  'Glow from within with our botanical blends.',
  'Nourish deeply with Josefina’s essentials.',
  'Beauty is attainable with authentic care.'
];
function showSlides() {
  slides.forEach(slide => slide.classList.remove("active"));
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");

  document.getElementById("promoText").innerHTML = promoMessages[slideIndex];
  document.getElementById("slideshowHeadline").innerText = textMessages[slideIndex];

  setTimeout(showSlides, 4000);
}
function showSlidesImmediately() {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[slideIndex].classList.add("active");

  document.getElementById("promoText").innerHTML = promoMessages[slideIndex];
  document.getElementById("slideshowHeadline").innerText = textMessages[slideIndex];
}
document.addEventListener("DOMContentLoaded", () => {
  showSlides();

  document.getElementById("prevSlide").onclick = () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlidesImmediately();
  };
  document.getElementById("nextSlide").onclick = () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlidesImmediately();
  };

  const scrollBtn = document.getElementById("scrollToTop");
  if (scrollBtn) scrollBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  document.querySelectorAll(".close").forEach(btn =>
    btn.addEventListener("click", e => {
      e.preventDefault();
      hideModals();
    })
  );
});
const cart = [];
let currentModalItem = { name: "", price: 0 };

function openDescriptionModal(img, title, desc, price) {
  currentModalItem = { name: title, price };

  document.getElementById("desc-img").src = img;
  document.getElementById("desc-title").textContent = title;
  document.getElementById("desc-text").textContent = desc;
  document.getElementById("desc-qty").value = 1;
  document.getElementById("desc-modal").style.display = "flex";

  const addBtn = document.getElementById("desc-add");
  addBtn.onclick = () => {
    const qty = parseInt(document.getElementById("desc-qty").value) || 1;
    confirmAddToCart(currentModalItem.name, currentModalItem.price, qty);
    document.getElementById("desc-modal").style.display = "none";
  };
}
function confirmAddToCart(name, price, qty = 1) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }
  updateCart();
  showConfirmation();
}
function updateCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your bag is empty.</p>";
  } else {
    cart.forEach((item, i) => {
      const row = document.createElement("div");
      row.className = "cart-row";
      row.innerHTML = `
        <span>${item.name}</span>
        <input type="number" value="${item.qty}" min="1" onchange="changeQty(${i}, this.value)" />
        <span>$${(item.price * item.qty).toFixed(2)}</span>
        <button onclick="removeFromCart(${i})">&times;</button>
      `;
      container.appendChild(row);
      total += item.price * item.qty;
    });
  }

  totalEl.textContent = "Total: $" + total.toFixed(2);
}
function changeQty(index, value) {
  const qty = parseInt(value);
  if (!isNaN(qty) && qty >= 1) {
    cart[index].qty = qty;
    updateCart();
  }
}
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
function showCart() {
  updateCart();
  document.getElementById("cart-modal").style.display = "flex";
}
function hideModals() {
  document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}
function proceedToCheckout() {
  alert("This feature has not been implemented yet.");
}
function showConfirmation() {
  const div = document.createElement("div");
  div.className = "cart-confirm";
  div.textContent = "Item added to bag! Click View Bag to check out.";
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

const products = [
  { id: 1, name: 'афон', category: 'phone', rating: 5, quantity: 3 },
  { id: 2, name: 'сасунг', category: 'phone', rating: 4, quantity: 2 },
  { id: 3, name: 'праймовик ПК', category: 'laptop', rating: 5, quantity: 1 },
  { id: 4, name: 'мак', category: 'laptop', rating: 3, quantity: 4 }
]
const cart = []
const productsDiv = document.getElementById('products')
const cartDiv = document.getElementById('cart')
function renderProducts(list) {
  productsDiv.innerHTML = ''
  list.forEach(p => {
    productsDiv.innerHTML += `
      <div class="product">
        <b>${p.name}</b><br>
        категорія: ${p.category}<br>
        рейтинг: ${p.rating}<br>
        є: ${p.quantity}<br>
        <button onclick="addToCart(${p.id})">додати</button>
      </div>
    `
  })
}
function renderCart() {
  cartDiv.innerHTML = ''
  cart.forEach(item => {
    cartDiv.innerHTML += `
      <div class="cart-item">
        <b>${item.name}</b><br>
        є: ${item.count}
        <button onclick="increaseItem(${item.id})">+</button>
        <button onclick="decreaseItem(${item.id})">-</button>
      </div>
    `
  })
}
function addToCart(id) {
  const product = products.find(p => p.id === id)
  if (product.quantity === 0) return
  const cartItem = cart.find(i => i.id === id)
  if (cartItem) {
    cartItem.count++
  } else {
    cart.push({ ...product, count: 1 })
  }
  product.quantity--
  save()
  renderProducts(products)
  renderCart()
}
function increaseItem(id) {
  const product = products.find(p => p.id === id)
  const cartItem = cart.find(i => i.id === id)
  if (product.quantity === 0) return
  cartItem.count++
  product.quantity--
  save()
  renderProducts(products)
  renderCart()
}
function decreaseItem(id) {
  const product = products.find(p => p.id === id)
  const cartItem = cart.find(i => i.id === id)
  cartItem.count--
  product.quantity++
  if (cartItem.count === 0) {
    cart.splice(cart.indexOf(cartItem), 1)
  }
  save()
  renderProducts(products)
  renderCart()
}
document.getElementById('categoryFilter').addEventListener('change', filter)
document.getElementById('ratingFilter').addEventListener('change', filter)
function filter() {
  const cat = categoryFilter.value
  const rate = Number(ratingFilter.value)
  let result = products
  if (cat !== 'all') {
    result = result.filter(p => p.category === cat)
  }
  result = result.filter(p => p.rating >= rate)

  renderProducts(result)
}
function save() {
  localStorage.setItem('products', JSON.stringify(products))
  localStorage.setItem('cart', JSON.stringify(cart))
}
function load() {
  const p = localStorage.getItem('products')
  const c = localStorage.getItem('cart')
  if (p) {
    products.length = 0
    products.push(...JSON.parse(p))
  }
  if (c) {
    cart.push(...JSON.parse(c))
  }
}
load()
renderProducts(products)
renderCart()
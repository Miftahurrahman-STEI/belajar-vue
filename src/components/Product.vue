<template>
  <div>
    <h1>Produk</h1>
    <div>
      <h3>{{ product.name }}</h3>
      <p>Harga: {{ product.price }}</p>
      <button @click="addToCartAPI(product)">Tambahkan ke Keranjang</button>
    </div>

    <button @click="toggleCart">Lihat Keranjang</button>

    <div v-if="showCart">
      <div v-if="cart.length > 0">
        <h2>Keranjang:</h2>
        <ul>
          <li v-for="item in cart" :key="item.id">
            {{ item.name }} - {{ item.quantity }} pcs (Harga: {{ item.price }})
          </li>
        </ul>
        <h3>Total Barang: {{ totalItems }}</h3>
        <h3>Total Harga: {{ totalPrice }}</h3>
      </div>
      <div v-else>
        <p>Keranjang kosong.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      cart: [],
      totalItems: 0,
      totalPrice: 0,
      showCart: false,
      loading: false,
      products: [
        { id: 1, name: 'Produk A', price: 100000 },
        { id: 2, name: 'Produk B', price: 200000 },
        { id: 3, name: 'Produk C', price: 300000 },
      ],
    }
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    console.log('Komponen dimuat')
    this.connectWebSocket()
  },

  beforeDestroy() {
    if (this.socket) {
      this.socket.close()
    }
  },

  methods: {
    connectWebSocket() {
      // Buat koneksi WebSocket
      this.socket = new WebSocket('wss://localhost:5000')

      // Tangani pesan yang diterima
      this.socket.onmessage = event => {
        const data = JSON.parse(event.data)
        if (data.type === 'cartUpdated') {
          this.updateCart(data.cartItems)
        }
      }

      // Tangani error
      this.socket.onerror = error => {
        console.error('WebSocket Error:', error)
      }

      // Tangani koneksi ditutup
      this.socket.onclose = () => {
        console.log('WebSocket ditutup')
      }
    },

    async addToCartAPI(product) {
      // Kirim data ke backend
      try {
        const response = await axios.post('http://localhost:5000/api/cart', {
          items: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
            },
          ],
        })

        console.log('Response POST:', response.data) // Debugging
        alert(response.data.message) // Berikan notifikasi
      } catch (error) {
        console.error(
          console.error('Error saat menambahkan ke keranjang:',error.response?.data || error.message)
        )
      }
    },

    addToCartWebsocket(item) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(
          JSON.stringify({
            type: 'addToCart',
            item,
          }),
        )
      } else {
        console.error('WebSocket belum terhubung')
      }
    },

    updateCart(cartItems, totalItems = null, totalPrice = null) {
      this.cart = cartItems
      this.totalItems =
        totalItems ?? cartItems.reduce((acc, item) => acc + item.quantity, 0)
      this.totalPrice =
        totalPrice ?? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    },

    async toggleCart() {
      console.log('Toggle Cart diklik')

      this.showCart = !this.showCart

      if (this.showCart && this.cart.length === 0) {
        console.log('Mengambil data keranjang...')
        this.loading = true

        try {
          const response = await axios.get('http://localhost:5000/api/cart')
          this.updateCart(
            response.data.cartItems,
            response.data.totalItems,
            response.data.totalPrice,
          )
        } catch (error) {
          console.error(
            'Error saat mengambil keranjang:',
            error.response?.data || error.message,
          )
        } finally {
          this.loading = false
        }
      }
    },

    async getCart() {
      console.log('Memulai request ke backend...')

      try {
        if (!this.showCart) return
        const response = await axios.get('http://localhost:5000/api/cart')
        console.log('Response GET:', response.data)

        this.updateCart(
          response.data.cartItems,
          response.data.totalItems,
          response.data.totalPrice,
        )
      } catch (error) {
        console.error(
          'Error saat mengambil keranjang:',
          error.response?.data || error.message,
        )
      }
    },

    async proceedToCheckout() {
      if (this.cart.length === 0) {
        alert('Keranjang kosong! Tambahkan produk terlebih dahulu.')
        return
      }

      alert('Melanjutkan ke halaman pembayaran...')
      console.log('Data keranjang:', this.cart)
    },
  },
}
</script>

<style scoped>
.product {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
button:hover {
  background-color: #218838;
}
</style>

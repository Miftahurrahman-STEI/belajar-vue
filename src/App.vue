<script setup>
import { ref } from 'vue'
import './index.css'

import MainButton from './components/MainButton.vue'
import InterpolateComponent from './components/InterpolateComponent.vue'
import ExpressionComponent from './components/ExpressionComponent.vue'
import Popup from './components/Popup.vue'

import Product from './components/Product.vue'
import APIGlobal from './components/APIGlobal.vue'
import HandlingUserInput from './components/HandlingUserInput.vue'

import axios from 'axios'

const greeting = ref('Hello World')
const blogPost = '<p style="color: red;">Ini adalah BlogPost</p>'
const idBlog = 'blog-1'
const blogClass = 'text-2xl flex flex-col'
</script>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Produk A',
          price: 100000,
          description: 'Deskripsi Produk A',
        },
        {
          id: 2,
          name: 'Produk B',
          price: 200000,
          description: 'Deskripsi Produk B',
        },
        {
          id: 3,
          name: 'Produk C',
          price: 300000,
          description: 'Deskripsi Produk C',
        },
      ],
      cart: [],

      foods: [
        {
          name: 'Apples',
          desc: 'Apples are a type of fruit that grow on trees.',
          favorite: true,
        },
        {
          name: 'Pizza',
          desc: 'Pizza has a bread base with tomato sauce, cheese, and toppings on top.',
          favorite: false,
        },
        {
          name: 'Rice',
          desc: 'Rice is a type of grain that people like to eat.',
          favorite: false,
        },
        {
          name: 'Fish',
          desc: 'Fish is an animal that lives in water.',
          favorite: true,
        },
        {
          name: 'Cake',
          desc: 'Cake is something sweet that tastes good.',
          favorite: false,
        },
      ],
    }
  },
  methods: {
    receiveEmit() {
      alert(x.name)
    },

    handleAddToCart(product) {
      this.cart.push(product)
      return this.cart
    },

    async goToCheckout() {
      try {
        const response = await axios.post('http://localhost:5000/api/cart', {
          items: this.cart,
        })

        console.log('Checkout berhasil:', response.data)

        // Navigasikan ke halaman konfirmasi pembayaran atau reset keranjang
        this.cart = []
        alert('Pembayaran berhasil!')

      } catch (error) {
        console.error('Checkout gagal:', error)
      }
    },

    proceedToCheckout() {
      if (this.cart.length === 0) {
        alert('Keranjang kosong! Silakan tambahkan produk terlebih dahulu.')
        return
      }
      this.goToCheckout()
    },
  },
}
</script>

<template>
  <div>
    <product
      v-for="item in products"
      :key="item.id"
      :product="item"
      @add-to-cart="handleAddToCart"
    />
    <button @click="proceedToCheckout">Lanjutkan Pembayaran</button>
  </div>

  <Popup />

  <MainButton />
  <MainButton />
  <MainButton />

  <p class="greeting">{{ greeting }}</p>
  <OptionsComponent />
  <CompositionComponent />
  <InterpolateComponent />

  <div :id="idBlog" :class="blogClass">
    {{ blogPost }}
  </div>
  <div v-html="blogPost"></div>

  <ExpressionComponent />
  <APIGlobal />

  <div>
    <HandlingUserInput />
  </div>
</template>

<style>
#wrapper {
  display: flex;
  flex-wrap: wrap;
}
#wrapper > div {
  border: dashed black 1px;
  flex-basis: 120px;
  margin: 10px;
  padding: 10px;
  background-color: lightgreen;
}
</style>

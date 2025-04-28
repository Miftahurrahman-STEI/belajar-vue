import express from 'express'
import cors from 'cors'

import WebSocket, { WebSocketServer } from 'ws'

import http from 'http'

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })
app.use(cors())
app.use(express.json())

// Simpan data keranjang (contoh sederhana, gunakan database untuk produksi)
let cartItems = []

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary })
      }
    })
  })
})

// wss.on('connection', (ws, req) => {
//   console.log('Klien terhubung:', req.socket.remoteAddress)

//   ws.send(JSON.stringify({ type: 'cartUpdated', cartItems }))

//   ws.on('message', message => {
//     console.log('Pesan diterima:', message)

//     try {
//       const data = JSON.parse(message)

//       if (data.type === 'addItemToCart') {
//         cartItems.push(data.item)
//         console.log('Keranjang diperbarui:', cartItems)

//         // Broadcast ke semua klien
//         wss.clients.forEach(client => {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify({ type: 'cartUpdated', cartItems }))
//           }
//         })
//       }
//     } catch (error) {
//       console.error('Error parsing message:', error.message)
//     }
//   })

//   ws.on('close', (code, reason) => {
//     console.log(`Klien terputus. Kode: ${code}, Alasan: ${reason}`)
//   })

//   ws.on('error', err => {
//     console.error('Error WebSocket:', err.message)
//   })
// })

setInterval(() => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.ping() // Kirim ping untuk menjaga koneksi
    }
  })
}, 30000) // Setiap 30 detik

// Endpoint untuk mengambil data produk
app.post('/api/cart', (req, res) => {
  const { items } = req.body

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Keranjang kosong' })
  }

  // cartItems = [...cartItems, ...items] // Simpan ke keranjang sementara

  // Tambahkan item ke keranjang
  items.forEach(item => {
    if (!item.quantity) {
      item.quantity = 1
    }

    const existingItem = cartItems.find(cartItem => cartItem.id === item.id)

    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      cartItems.push(item)
    }
  })

  console.log('Cart Items Setelah Ditambah:', cartItems) // Debugging
  res.json({ message: 'Keranjang berhasil ditambahkan', cartItems })
})

// Endpoint GET untuk mengambil data keranjang
app.get('/api/cart', (req, res) => {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0) // Hitung total item
  res.json({ cartItems, totalItems })
})

app.get('/', (req, res) => {
  res.send('API berjalan')
})

server.on('upgrade', (request, socket, head) => {
  console.log('Upgrade event diterima')
  wss.handleUpgrade(request, socket, head, ws => {
    console.log('WebSocket connection dimulai')
    wss.emit('connection', ws, request)
  })
})

// Menjalankan server
const PORT = 5000
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`)
})

const express = require('express')
const app = express()
const port = 3000

// const { Client } = require('pg')
// const client = new Client({
//     host:'localhost',
//     user:'postgres',
//     password:'postgres',
//     database:'navi',
//     port:5432,
// })
// client.connect()
// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
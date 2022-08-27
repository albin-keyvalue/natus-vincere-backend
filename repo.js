const { Client } = require('pg')
const client = new Client()
client.connect()

const res = client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
client.end()
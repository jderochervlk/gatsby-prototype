const express = require('express')
const app = express()

app.use('/', express.static('public'))

app.get('foo', (req, res) => res.send('bar'))

app.listen(8080, () => console.log('App listening on port 8080'))
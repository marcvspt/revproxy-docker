const express = require('express')
const path = require('path')

const PORT = process.env.NODEJS_PORT || 3000

const app = express()
const templatesDir = path.join(__dirname, 'templates')
app.use(express.static(templatesDir))

app.get('/', (req, res) => {
    res.sendFile(path.join(templatesDir, 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Running on http://0.0.0.0:${PORT}`)
})
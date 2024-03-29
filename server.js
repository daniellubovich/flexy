// start the express server, serving index.html on port 4200

const express = require('express')
const path = require('path')

const app = express()

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname)))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(process.env.PORT || 4200)

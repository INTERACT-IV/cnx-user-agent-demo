const express = require('express')

const app = express()
app.use("/", express.static(__dirname));

app.listen( 1338, '127.0.0.1' ) 
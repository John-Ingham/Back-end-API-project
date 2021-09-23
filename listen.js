const http = require('http')
const app = require('./app')


const PORT = process.env.PORT || 9090

app.listen(PORT, (err) =>{
    if (err) console.log(err)
    else console.log(`Server listens at Port ${PORT}`)
})
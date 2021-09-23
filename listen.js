const http = require('http')

const server = http.createServer((req, res) => {
    //console.log(request)
})

const PORT = process.env.PORT || 9090

server.listen(PORT, (err) =>{
    if (err) console.log(err)
    else console.log(`Server listens at Port ${PORT}`)
})
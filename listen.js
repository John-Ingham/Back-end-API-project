const http = require('http')

const server = http.createServer((req, res) => {
    //console.log(request)
})

server.listen(9090, (err) =>{
    if (err) console.log(err)
    else console.log("Server listens at Port 9090")
})
const http = require('http')

const hostname = '127.0.0.1'
const port = 3000 

// Server Creation
const server = http.createServer((req,res)=>{
  if (req.url === '/') {
      res.statusCode = 200
      res.setHeader('Content-Type','text/plain')
      res.end("response is done")
  } else if (req.url === '/about') {
      res.statusCode = 200
      res.setHeader('Content-Type','text/plain')
      res.end("you are on about page ")
} else {
    res.statusCode = 404
      res.setHeader('Content-Type','text/plain')
      res.end("404 Not found ")
}
}
)


// Server listing 

server.listen(port,hostname,()=>{
    console.log(`Server is listening at http://${hostname}:${port}`);
})
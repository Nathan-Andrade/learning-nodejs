const http = require('http');
const URL = require('url');
const fs = require('fs');
const path = require('path');

const data = require('./urls.json');

//função para escrever arquivos
function writeFile(cb){
  fs.writeFile(
    path.join(__dirname, "urls.json"),
    JSON.stringify(data, null, 2),
    err => {
      if(err) throw err

      cb(JSON.stringify({message: "ok"}))
    }
  )
}

http.createServer((req, res) => {
  const { name, url, del } = URL.parse(req.url, true).query

  // para ter acesso a api
  res.writeHead(200, {
    'Acess-Control-Allow-Origin': '*'
  })

  //all resources
  if(!name || !url){
    return res.end(JSON.stringify(data))
  }

  // remover arquivos
  if(del){
    data.urls = data.urls.filter(item => String(item.url) !== String(url))

    return  writeFile((message) => {res.end(message)})
  }

  //create
  data.urls.push({name, url})

  return writeFile((message) => res.end(message))
  
}).listen(3333, () => console.log('Api is running'))
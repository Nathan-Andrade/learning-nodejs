const EventEmitter = require('events');
const fs = require('fs'); //arquivos de sistema (file system)
const path = require('path'); //pegar o caminho correto

const emitter = new EventEmitter()

emitter.on('log', (message) => {
  fs.appendFile(path.join(__dirname, 'log.txt'), message, (err) => {
    if (err) throw err
  })
})

function log(message){
  emitter.emit('log', message)
}

module.exports = log;
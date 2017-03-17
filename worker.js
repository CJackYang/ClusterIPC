import http from 'http'
import cluster from 'cluster'

import ipcWorker from './ipcWorker'

import { getListAsync } from './files'

if(cluster.isWorker){
  console.log('worker start work')
  ipcWorker.start()
  http.createServer(function (req, res) {
  res.writeHead(200, {"content-type": "text/html"});
  ipcWorker.call('command','FILE_LIST',{ path:__dirname }, (e, data) => {
    console.log('woker: ' + cluster.worker.id + ' finished')
    res.write(JSON.stringify(data))
    res.end()
  })
  }).listen(3000);
}
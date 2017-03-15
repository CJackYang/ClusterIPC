import http from 'http'
import cluster from 'cluster'
import os from 'os'
import ipcMain from './ipcMain'
import ipcWorker from './ipcWorker'

import { getListAsync } from './files'

if (cluster.isMaster) {
  // init data source

  //create workers

  os.cpus().forEach(() => {
    cluster.fork()
  })

  //start ipcMain
  ipcMain.start()

}else if(cluster.isWorker){
  ipcWorker.start()
  http.createServer(function (req, res) {
  res.writeHead(200, {"content-type": "text/html"});
  ipcWorker.call('command','FILE_LIST',{ path:__dirname }, (e, data) => {
    res.write(JSON.stringify(data))
    res.end()
  })
  }).listen(3000);
}

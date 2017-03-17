import http from 'http'
import cluster from 'cluster'
import os from 'os'
import ipcMain from './ipcMain'

if (cluster.isMaster) {
  // init data source

  cluster.setupMaster({exec: 'worker.js'})
  //create workers
  os.cpus().forEach(() => cluster.fork())


  //start ipcMain
  ipcMain.start()

}

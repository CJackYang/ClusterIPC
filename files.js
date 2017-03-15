import fs from 'fs'
import Promise from 'bluebird'
import ipcMain from './ipcMain'

Promise.promisifyAll(fs)

const asCallback = (afunc) => 
  (args, callback) => 
    afunc(args).asCallback((err, data) => 
      err ? callback(err) : callback(null, data))

const getListAsync = async ({ path }) => {
  return await fs.readdirAsync(path)
}

ipcMain.registerCommandHandlers(new Map([['FILE_LIST', asCallback(getListAsync)]]))

export { getListAsync }
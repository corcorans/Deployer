fs = require('fs.extra')
remote_location = 'C:/test'
source_location = 'C:/temp'
curPath = ''

deleteRemoteDir = (path) ->
   if fs.existsSync(path)
      fs.readdirSync(path).forEach (file, index) ->
         curPath = path + "/" + file
         
         if fs.statSync(curPath).isDirectory()
            deleteRemoteDir(curPath)
         else
            fs.unlinkSync(curPath)
      fs.rmdirSync(path)
   else


if remote_location != '' and source_location != ''
   deleteRemoteDir(remote_location)
   
   fs.mkdir(remote_location, (err) ->
      if err
         throw err
      else
         console.log "Remote directory was created"
   )

   fs.copyRecursive(source_location, remote_location, (err) ->
      if err
         throw err
      else
         console.log "Files were copied"
   )
else
   console.log "Please enter a location"
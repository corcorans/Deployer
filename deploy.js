var fs = require ('fs.extra');
var remote_location = '';
var source_location = '';

/* Delete the remote folder recursively*/
var deleteRemoteDir = function(path) {
  if(fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      
      if(fs.statSync(curPath).isDirectory()) { 
         deleteRemoteDir(curPath); 
      } else { 
         fs.unlinkSync(curPath); 
      }
      
    });
    fs.rmdirSync(path);
  }
};

// Delete directory and sub directories
deleteRemoteDir(remote_location);

// Remake the initial directory
fs.mkdir(remote_location', function(err) {
   if(err) { throw err; }
   console.log("Remote directory created.");
});

// Copy from local to remote location
fs.copy (source_location, remote_location, function (err) {
    if (err) { throw err; }
    console.log ("Files were copied.");
});
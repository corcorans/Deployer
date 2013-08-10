/**
 * Fill out remote_location and source_location
 */
var fs = require ('fs.extra');
var remote_location = 'C:/test';
var source_location = 'C:/temp';

/* Delete the remote folder recursively*/
function deleteRemoteDir(path) {
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

/* Run the script */
if(remote_location != '' && source_location != '') {
   // Delete directory and sub directories
   deleteRemoteDir(remote_location);

   // Remake the initial directory
   fs.mkdir(remote_location, function(err) {
      if(err) { throw err; }
      console.log("Remote directory was created.");
   });

   // Copy from local to remote location
   fs.copyRecursive (source_location, remote_location, function (err) {
       if (err) { throw err; }
       console.log ("Files were copied.");
   });
} else {
   console.log("Please fill put a remote and source locations.");
}
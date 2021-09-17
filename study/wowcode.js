//1. bluethooth api


//2. push api


//3. contact picker api


//4. shape ectection api


//5 sensor api


//6 webXR api

// gamepad api

//7 viberation api


//8 clipboard api


//9 webUSB api
function vibrate(){
  startVibrate(1000);
}


var vibrateInterval;

// Starts vibration at passed in level
function startVibrate(duration) {
    navigator.vibrate(duration);
}

// Stops vibration
function stopVibrate() {
    // Clear interval and stop persistent vibrating
    if(vibrateInterval) clearInterval(vibrateInterval);
    navigator.vibrate(0);
}

// Start persistent vibration at given duration and interval
// Assumes a number value is given
function startPeristentVibrate(duration, interval) {
    vibrateInterval = setInterval(function() {
        startVibrate(duration);
    }, interval);
}





































//10. file system access api

function sample10(){
    const currentDirHandle =FileSystemDirectoryHandle
    const dirName = 'directoryToGetName';
    // assuming we have a directory handle: 'currentDirHandle'
    const subDir = currentDirHandle.getDirectoryHandle(dirName, {create: true});
}




async function returnPathDirectories(directoryHandle) {

    // Get a file handle by showing a file picker:
    const handle = await self.showOpenFilePicker();
    if (!handle) {
      // User cancelled, or otherwise failed to open a file.
      return;
    }
  
    // Check if handle exists inside directory our directory handle
    const relativePaths = await directoryHandle.resolve(handle);
  
    if (relativePath === null) {
      // Not inside directory handle
    } else {
      // relativePath is an array of names, giving the relative path
  
      for (const name of relativePaths) {
        // log each entry
        console.log(name);
      }
    }
  }


let fileHandle;

const butOpenFile = document.getElementById('btn');
const textArea = document.getElementById('textArea');
  
butOpenFile.addEventListener('click', async () => {
  // Destructure the one-element array.
  [fileHandle] = await window.showOpenFilePicker();
  // Do something with the file handle.
  const file = await fileHandle.getFile();
  const contents = await file.text();
  textArea.value = contents;
});




async function getNewFileHandle() {
  const options = {
    types: [
      {
        description: 'Text Files',
        accept: {
          'text/plain': ['.txt'],
        },
      },
    ],
  };
  const handle = await window.showSaveFilePicker(options);
  return handle;
}


async function writeFile(fileHandle, contents) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}

window.onload = function(){
  
}

const butOpenFile2 = document.getElementById('btn2');

butOpenFile2.addEventListener('click', async () => {

  vibrate();


  // const handle = await getNewFileHandle();
  // writeFile(handle,'test');
});
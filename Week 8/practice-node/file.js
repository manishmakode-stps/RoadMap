const fs = require('fs');
const os = require('os');
// Synchronous call/ blocking code
// fs.writeFileSync('./test.txt','hello world overwrite');

// Asynchronous call/ non-blocking code

// fs.writeFileSync('./newfile.txt', 'this content belongs to new file which is created by async call'
// )

// to delete a file
// fs.unlinkSync('./newfile.txt');

// fs.readFile('./test.txt','utf-8',(err,data)=>{
//     console.log(data);
// })

// function readFile(){
//     // read data from the file
//     const syncData = fs.readFileSync('./test.txt','utf-8');
//     console.log(syncData);
// }
// readFile();

// append data into file
// fs.appendFileSync('./test.txt', new Date().toString());

// fs.appendFile('./test.txt', "new data", (err)=> {
//     if (err) {
//         console.log(err);
//     }
// })


// fs.mkdirSync('./newFolder');

// fs.rmdirSync('./newFolder');

console.log(os.cpus()[0]);
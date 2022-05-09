//For large files data arrive as buffers in streams.

const fs=require('fs');

const readStream= fs.createReadStream('./docs/blog3.txt', {encoding:'utf8'});
const writeStream=fs.createWriteStream('./docs/blog4.txt');
readStream.on('data',(chunks)=>{
    console.log('--New Chunk---');
    console.log(chunks);
})

//piping
readStream.pipe(writeStream);
const http=require('http');
const fs=require('fs');
//const _ = require('lodash');


const server=http.createServer((req,res)=>{
     
    //loadash
    // const num=_.random(0,20);
    // console.log(num);

    // const greet=_.once(()=>{
    //     console.log('Hello');
    // });

    // greet();
    // greet();


    res.setHeader('Content-Type','text/html');

    // res.write('<p>Helloo from Server!</p>');
    // res.write('<p>My name is Harsh Tita!</p>');


    //Basic routing
    let path='./views/';
    switch(req.url){
        case '/':
            path+='index.html';
            res.statusCode=200;
            break;
        case '/about':
            path+='about.html';
            res.statusCode=200;
            break;
            //Redirect demo with status code
        case '/about-bla':
            res.statusCode=301; 
            res.setHeader('Location','/about');
            res.end();    
            break;
        default:
            path+='404.html';
            res.statusCode=400;
            break;
    }
     
    //send an html file
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }
        res.write(data);
        res.end();
    })
    
})

server.listen(3000,'localhost', ()=>{
    console.log('listening to request');
});
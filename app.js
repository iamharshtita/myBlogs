const express= require('express');
const { render } = require('express/lib/response');
const mongoose=require('mongoose');

const blogRoutes=require('./routes/blogsRoutes');
//express app

const app=express();

//connect to MongoDB
const dbURI='mongodb+srv://harshtita01:test12012001@cluster0.mxck5.mongodb.net/blogs_db?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> app.listen(process.env.Port || 3000))
    .catch((err)=> console.log(err))


//register view engine
app.set('view engine', 'ejs');




//middleware and static files(css, images,etc are the files which we want the browser to give access to)
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); //used for accepting form data


app.use((req,res,next)=>{
    console.log('New request made: ');
    console.log('Host: ',req.hostname);
    console.log('Path: ', req.path);
    console.log('Method: ', req.method);
    next();
});

app.get('/', (req,res)=>{

    //res.send('<h1>Home page</h1>');
    //res.sendFile('./views/index.html',{root: __dirname});
    res.redirect('/blogs');
    
});

app.get('/about', (req,res)=>{

    //res.send('<h1>About page</h1>');
    //res.sendFile('./views/about.html',{root: __dirname});
    res.render('about', {title:'About'})
});

//blog routes
app.use('/blogs',blogRoutes);


//redirects
// app.get('/about-us',(req,res)=>{
//     //res.redirect('/about');
// })


//404 page, always at bottom of all the middlewares

app.use((req,res)=>{
    //res.status(404).sendFile('./views/404.html',{root: __dirname});
    res.status(404).render('404',{title:'404'})
})

//Middleware are functions that run on the server between a request from website and response to the server. eg: app.get(), app.use()

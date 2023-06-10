const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const lodash=require('lodash');

const app=express();
const port=3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const para1='Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, fugit! Suscipit non cumque modi expedita sed possimus quo excepturi, odio dicta, veritatis facilis aliquam tempora tenetur quam, culpa error. A harum ipsum quaerat repellendus quos temporibus alias blanditiis iste animi explicabo quia, asperiores distinctio, dolore, neque aperiam quis dolor architecto.';
const para2='Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, fugit! Suscipit non cumque modi expedita sed possimus quo excepturi, odio dicta, veritatis facilis aliquam tempora tenetur quam, culpa error. A harum ipsum quaerat repellendus quos temporibus alias blanditiis iste animi explicabo quia, asperiores distinctio, dolore, neque aperiam quis dolor architecto.';
const para3='Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, fugit! Suscipit non cumque modi expedita sed possimus quo excepturi, odio dicta, veritatis facilis aliquam tempora tenetur quam, culpa error. A harum ipsum quaerat repellendus quos temporibus alias blanditiis iste animi explicabo quia, asperiores distinctio, dolore, neque aperiam quis dolor architecto.';

let posts=[];
let title1='';

app.get('/', function(req, res){
    res.render('home', {paragraph1: para1, posts: posts});
});

app.get('/about', function(req, res){
    res.render('about', {paragraph2: para2});  
});

app.get('/contact', function(req, res){
    res.render('contact', {paragraph3: para3});  
});

app.get('/compose', function(req, res){
    res.render('compose');  
});

app.get('/posts/:topic', function(req, res){
    // console.log(req.params.topic);
    title1=req.params.topic;
    posts.forEach(function(elem){
        let minititle=lodash.lowerCase(elem.title);
        let kebabtitle=lodash.kebabCase(elem.title);
        if(title1===minititle || title1===kebabtitle){
            res.render('newposts', {newposttitle: elem.title, newpostpara: elem.content});
        }
    });
});

app.post('/posts/:topic', function(req, res){
    res.redirect('/newposts');
})

app.post('/compose', function(req, res){

    const post={
        title: req.body.titleInput,
        content: req.body.postTextarea
    }

    posts.push(post);

    res.redirect('/');

})





app.listen(port, function(req, res){
    console.log("your server is up and running at port : ", port);
});
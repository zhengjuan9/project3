//引入
var express=require('express');
// var favicon=require('serve-favicon');
var morgan=require('morgan');
var bodyPaser=require('body-parser');
// var ejsRouter=require('./router/ejsRouter.js');
var ejs=require('ejs');

// console.log(path.resolve(__dirname,'./public'));

//使用配置
//搭建服务器
var app=express();
//配置静态文件
app.use(express.static(__dirname));
//配置图标
// app.use(favicon(__dirname,'/public/favicon.ico'));
//配置日志
app.use(morgan('dev'));
//配置post
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended:false}));

//配置ejs
//配置视图的路径
app.set('views',__dirname);
//声明html引擎
app.engine('html',ejs.__express);
//配置引擎的文件类型和扩展名
app.set('view engine','html');

app.get('/nav',function (req,res) {
    res.render('./view/nav')
});
app.get('/homepage', function (req, res) {
    res.render('./public/pages/zj/homepage')
});
app.get('/buypage', function (req, res) {
    res.render('./public/pages/zj/buypage')
});
app.get('/3D', function (req, res) {
    res.render('./public/pages/cl/3D')
});
app.get('/T1', function (req, res) {
    res.render('./public/pages/Laser-television-T1')
});
app.get('/H2', function (req, res) {
    res.render('./public/pages/Home-entertainment-H2')
});
// app.use(ejsRouter);
//配置端口
app.listen('6543',function () {
    console.log('开始')
});


































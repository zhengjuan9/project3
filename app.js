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
app.get('/footer',function (req,res) {
    res.render('./view/footer')
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
app.get('/equipment', function (req, res) {
    res.render('./public/pages/cl/equipment')
});
app.get('/Frame', function (req, res) {
    res.render('./public/pages/cl/Frame')
});
app.get('/home', function (req, res) {
    res.render('./public/pages/cl/home')
});
app.get('/install', function (req, res) {
    res.render('./public/pages/cl/install')
});
app.get('/invoice', function (req, res) {
    res.render('./public/pages/cl/invoice')
});
app.get('/payment', function (req, res) {
    res.render('./public/pages/cl/payment')
});
app.get('/pcassistant', function (req, res) {
    res.render('./public/pages/cl/pcassistant')
});
app.get('/Policy', function (req, res) {
    res.render('./public/pages/cl/Policy')
});
app.get('/Portable', function (req, res) {
    res.render('./public/pages/cl/Portable')
});
app.get('/service', function (req, res) {
    res.render('./public/pages/cl/service')
});
app.get('/TV', function (req, res) {
    res.render('./public/pages/cl/TV')
});
app.get('/whole', function (req, res) {
    res.render('./public/pages/cl/whole')
});
app.get('/play',function (req,res) {
    res.render('./public/pages/tmyPlay')
});
app.get('/NewZ4air',function (req,res) {
    res.render('./public/pages/tmyNewZ4air')
});
app.get('/centeraddress', function (req, res) {
    res.render('./public/pages/xhy/centeraddress')
});
app.get('/centerbase', function (req, res) {
    res.render('./public/pages/xhy/centerbase')
});
app.get('/centercoupon', function (req, res) {
    res.render('./public/pages/xhy/centercoupon')
});
app.get('/centerorder', function (req, res) {
    res.render('./public/pages/xhy/centerorder')
});
app.get('/centerrepair', function (req, res) {
    res.render('./public/pages/xhy/centerrepair')
});
app.get('/centerreturn', function (req, res) {
    res.render('./public/pages/xhy/centerreturn')
});
app.get('/centeruser', function (req, res) {
    res.render('./public/pages/xhy/centeruser')
});
app.get('/centercash', function (req, res) {
    res.render('./public/pages/xhy/centercash')
});
app.get('/login', function (req, res) {
    res.render('./public/pages/xhy/login')
});
app.get('/register', function (req, res) {
    res.render('./public/pages/xhy/register')
});
app.get('/forgetpassword', function (req, res) {
    res.render('./public/pages/xhy/forgetpassword')
});

app.get('/T1', function (req, res) {
    res.render('./public/pages/Laser-television-T1')
});
app.get('/H2', function (req, res) {
    res.render('./public/pages/Home-entertainment-H2')
});

// 耀LUNE4KPro
app.get('/LUNE4KPro', function (req, res) {
    res.render('./public/pages/zp/LUNE4KPro')
});
// 皓LUNE4K
app.get('/LUNE4K', function (req, res) {
    res.render('./public/pages/zp/LUNE4K')
});
// 耀 参数
app.get('/cansu', function (req, res) {
    res.render('./public/pages/zp/parameters')
});
//皓 参数
app.get('/4kto', function (req, res) {
    res.render('./public/pages/zp/LUNE4KTo')
});
// app.use(ejsRouter);
//配置端口
app.listen('8899',function () {
    console.log('开始')
});


































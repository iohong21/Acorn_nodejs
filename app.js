var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


function singupFunc(res, m, email, pwd){
  var result = { method: m, email:email, pwd:pwd };

  // 콘솔에 출력해 보기
  console.log("E-mail: " + email + "  ,  Password: " + pwd);
  res.end(JSON.stringify(result));
}
// post 방식 /signup 요청이 왔을때 실행할 함수 등록
app.post("/signup", function(req, res){
  // 폼 전송한 내용 읽어오기
  var email = req.body.email;
  var pwd = req.body.pwd;
  singupFunc(res, "post", email, pwd);
});
// get 방식 /signup 요청 처리
app.get("/signup", function(req, res){
  var email = req.query.email;
  var pwd = req.query.pwd;
  singupFunc(res, "get", email, pwd);
});


function tes01Func(res, m){
  var rmsg = '<ul><li>감자</li><li>고구마</li><li>두부</li></ul>';
  // var rmsg = "<strong>Seoul</strong> in Korea.<br/><em>Naver is potal</em>";
  var result = { method: m, msg:rmsg };

  console.log("received: " + rmsg);
  res.end(JSON.stringify(result));
}
// get 방식 /signup 요청 처리
app.post("/ajax/test01", function(req, res){
  var msg = req.body.msg;
  tes01Func(res, "post");
});
// get 방식 /signup 요청 처리
app.get("/ajax/test01", function(req, res){
  var msg = req.query.msg;
  tes01Func(res, "get");
});

function findMember(res, m, queryKey){
  var result = {};
  var data = [
    {name:"홍길동", addr:"대한민국"},
    {name:"앨런포우", addr:"영국"},
    {name:"링컨", addr:"미국"},
    {name:"마오쩌뚱", addr:"중국"},
    {name:"무사시", addr:"일본"},
  ];

  var nKey = parseInt(queryKey)-1;
  
  result.method = m;
  if(nKey < 0 || nKey > 4) {
    resumt.name = "not found";
    result.addr = "";
  } else {
    result.name = data[nKey].name;
    result.addr = data[nKey].addr;
  }

  console.log(JSON.stringify(result));
  res.end(JSON.stringify(result));
}
app.post("/ajax/member",function(req,res){
  var num = req.body.num;
  findMember(res, "post", num);
});
app.get("/ajax/member",function(req,res){
  var num = req.query.num;
  findMember(res, "get", num);
});


var checkID = function(res, id){
  res.end(JSON.stringify({canUse: id != "gura"}));
}
app.post("/ajax/check_id",function(req,res){
  checkID(res, req.body.id);
});
app.get("/ajax/check_id",function(req,res){
  checkID(res, req.query.id);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

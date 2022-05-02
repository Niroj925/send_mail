
const express=require('express');
const app = express();
const path = require('path');
const bodyParser= require('body-parser');
const viewpath= path.join(__dirname, './view');
var nodemailer=require('nodemailer');

app.set('view engine', 'ejs');
app.set('views',viewpath);

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res){
    res.render('profile');
})

app.post('/mail', function(req, res){

const email = req.body.email;
const mail = req.body.mail;
const btnval=req.body.btn;
console.log('email:'+email);
console.log('mail:'+mail);
console.log('btn val:'+btnval);

if(btnval==='ok'){
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'thapanirajan2069@gmail.com',
      pass: 'Thapa@2069'
    }
  });
  
  var mailOptions = {
    from: 'thapanirajan2069@gmail.com',
    to: email,
    subject: 'Send from NeoTech',
    text: mail
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.redirect('/');
}
})

  app.listen(2200,function(err){
      if(!err){
          console.log('server is running');
      }
  })


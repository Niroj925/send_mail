
const express=require('express');
const app = express();
const path = require('path');
const bodyParser= require('body-parser');
const viewpath= path.join(__dirname, './view');
const nodemailer =require('nodemailer');
const {google}=require('googleapis');

const PORT=process.env.PORT||2200;

require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views',viewpath);

app.use(bodyParser.urlencoded({ extended: false}));

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
  sendMail(email,mail)
.then((result)=>console.log('email sent...',result))
.catch((err)=>console.log(err.message));
  res.redirect('/');
}
})

 app.listen(PORT,function(err){
      if(!err){
          console.log('server is running');
      }
  })

//lets make a function to send email 

const client_id='152987635030-v7gksg0ohvacpd1psvpb2io51bsldskn.apps.googleusercontent.com';
const client_secret='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';
const redirect_url='https://developers.google.com/oauthplayground';
const refresh_token=
'1//04VRP4qHQO1g9CgYIARAAGAQSNwF-L9Irx3Hqk1OMQ152PpkftHxBYABQL7RpkREtn80OIRSvfgHd1KJswV_0RLcSSHhqLfiaqZs';

const oAuth2client=new google.auth.OAuth2(client_id,client_secret,redirect_url)
oAuth2client.setCredentials({refresh_token:refresh_token});

async function sendMail(email,msg){
    try{
        const accessToken=await oAuth2client.getAccessToken();
        console.log(accessToken);
       console.log(accessToken.token);
        const transport=nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'hamroghar531@gmail.com',
                clientId:client_id,
                clientSecret:client_secret,
                refershToken:refresh_token,
                accessToken:accessToken.token,
               // accessToken:'ya29.A0ARrdaM90xXpIWespBlASaiidy_zNu-LQy2TZjKeXhUodMPWpCW34efe2JE9U0XAgjRiz92A4AK5g91Erv8o6seKcj6817ZOL2mk4e7M_Sud7E4LuBn3j9HmS_Y4jxTxyq7bg_W7lhgMwS2Gv3LSM_h9iCfnCEA'
            }
        })

        const mailOptions={
            from:'hamroghar531@gmail.com',
            to:email,
            subject:'email from gmail api',
            text:msg
        };
        const result=await transport.sendMail(mailOptions);
        return result;

    }catch(err){
        return err;
    }

}


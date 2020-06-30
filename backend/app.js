const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/htmlRoutes');
const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(__dirname+'/../crawler/build'));
app.set('views',__dirname+'/client/views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
app.use(session({
    name:"userId",
    secret:'sjfowi#@#$!@# lfsjlrei234@#l jlrj2#$!23',
    resave:false,
    saveUninitialized:false,
    cookie:{path:'/',httpOnly:true,secure:false,maxAge:null}
}));

app.use('/',routes);
const PORT = process.env.PORT || 4000;
app.listen(PORT,function(){
    console.log('app started listening on port ',PORT);
});
module.exports = app;
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

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// const blogsController = require('./controllers/getControllers').socket(io);
app.use(session({
    name:"userId",
    secret:'sjfowi#@#$!@# lfsjlrei234@#l jlrj2#$!23',
    resave:false,
    saveUninitialized:false,
    cookie:{path:'/',httpOnly:true,secure:false,maxAge:null}
}));

app.use('/',routes);
const PORT = process.env.PORT || 4000;

// server.listen(PORT);
app.listen(4000);
module.exports = app;
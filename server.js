const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

// MongoDB Atlas setup
mongoose.connect('mongodb+srv://root:root@chatbotcluster-p4cpm.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
.then(() => {
        console.log('Connected to mongoDB')
}).catch(e => {
        console.log('Error while DB connecting');
        console.log(e);
});

const app = express();

// Setup body-parser
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/hello',function(req,res){
    res.json("Hello World")
})

// Setup user router
var userRouter = require(__dirname + '/controllers/userController');
app.use('/user', userRouter);

var port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));

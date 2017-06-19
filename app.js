const express = require('express'),
    sequelize = require('sequelize'),
    bodyParser =require ('body-parser'),
    logger = require('morgan');
    

// const user = require('./models/user.js');
const app = express();
app.use(logger('dev'));

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require('./server/routes/userRoutes')(app);
// require('./server/routes/groupRoutes')(app);




// app.use('/api/User/signup',userRoutes); 
// app.use('/api/User/signin',userRoutes);


// app.use('/api/Group',groupRoutes);
// app.use('/api/Group/groupid/user',groupuserRoutes);
// app.use('/api/Group//groupid/message',groupRoutes);

app.post('/', function(req, res){
    res.json({message:'Welcome to Postit'});
});

app.post('/users', function(req, res){
    res.json({message:'Welcome to Postit. You should signup to enjoy this environment'});
});

app.listen(port,() => {
    console.log(`Server running on port ${port}`)
});

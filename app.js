import express from 'express';
import sequelize from 'sequelize';
import bodyParser from 'body-parser';
import logger from 'morgan';
import db from './server/models';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev';
    

// const user = require('./models/user.js');
const app = express();

app.use(logger('dev'));

const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware (compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true

}));

app.use(webpackHotMiddleware(compiler));

require('./server/routes/userRoute')(app);
require('./server/routes/groupRoute')(app);
require('./server/routes/userGroupRoute')(app);
require('./server/routes/messageRoute')(app);



app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/index.html'));
})

app.post('/', function(req, res){
    res.json({message:'Welcome to Postit'});
});

app.post('/users', function(req, res){
    res.json({message:'Welcome to Postit. You should signup to enjoy this environment'});
});


db.sequelize.sync().then(()=>{
    app.listen(port,() => {
    console.log(`Server running on port ${port}`)
    });
})

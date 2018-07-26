'use strict';

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const logger = require('./services/logger');
const eventsRoutes = require('./routes/eventsRoutes');
const newsRoutes = require('./routes/newsRoutes');
const vRequestRoutes = require('./routes/vRequestRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
//const                 //Def const es events

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

logger(app);

///routes
app.use('/event', eventsRoutes);
app.use('/user', userRoutes);
app.use('/news', newsRoutes);
app.use('/vRequest', vRequestRoutes);
app.use('/chat', chatRoutes);
//app.use('/')          //Def routes as events


module.exports = app;

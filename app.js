const appDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8080;
const costs = require('./routes/costs.js');
const users = require('./routes/users.js');
const devTeam = require('./routes/developersTeam.js');
app.use(express.json());

/// to do : connect to db 
async function connectTodb()
{ 
     try{
    const dbConnection  = await mongoose.connect("mongodb://localhost:27017/costManager");
        dbDebug("connected to db cost manager");
        return dbConnection ;
    }
    catch(err){
       dbDebug("failed to connect to the Data base", err.message);
    }
}
connectTodb();


// costs rout
app.use('/api',costs);
app.use('/api/add',costs);
app.use('api/report',costs);


// users rout 
app.use('/api/users',users);
app.use('/api/users/add',users);
app.use('/api/users/:id',users);
app.use('/api/about', devTeam);



app.listen(PORT , ()=>{

    appDebug("app is run");
})


 




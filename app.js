const express = require('express');
const userData = require('./src/model/UserData');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const alert = require('alert');
const reqData = require('./src/model/ReqData');
const { collection, update } = require('./src/model/UserData');
const port = 5000;

var app = new express();

app.use(cors());
app.use(bodyParser.json());

VerifyToken = (req,res,next) =>
{
    if (!req.headers.authorization)
    {
        return res.status(401).send('unauthorized');
    }
    let token = req.headers.authorization.split('')[1];
    if (token=='null')
    {
        return res.status(401).send('unauthorized');
    }
    let payload = jwt.verify(token, 'secretKey');
    console.log(payload);
    if (!payload)
    {
        return res.status(401).send('unauthorized');
    }
    req.email = payload.subject;
    next() 
}

app.get('/finddonor', (req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    userData.find()
            .then(users => 
                {
                    res.send(users);
                });
});

app.post('/signup', (req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(422).jsonp(errors.array());
    }
    else
    {
        var user = new userData(
        {
            name: req.body.user.name,
            email: req.body.user.email,
            blood: req.body.user.blood,
            phone: req.body.user.phone,
            address1: req.body.user.address1,
            address2: req.body.user.address2, 
            password: req.body.user.password
        });
        user.save();
    }
});

app.post('/login', (req,res) =>
{   
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    
    let userdata = req.body.user;
    userData.findOne(
        {
            email: userdata.email
        }
    )
    .then(user =>
        {
            userDb = user;
        })
    .catch(err =>
        {
            alert(err);
        });

    if (userDb==undefined)
    {
        res.status(404).send({msg: "Not Found"});
    }
    else
    {
        var msg = "";
        var isValid = false;
        if (!(bcrypt.compareSync(userdata.password, userDb.password)))
        {
            msg = "invalid password";
            res.status(200).send({isValid, msg});
        }
        else
        {
            let payload = {subject: userDb.email+userDb.password};
            let token = jwt.sign(payload, 'secretKey');
            isValid = true;
            msg = "Login Successfull";
            res.status(200).send({token, userDb, isValid, msg});
        }
    }    
});

app.get('/account/requests' || '/account/postedreqs', (req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    reqData.find()
           .then(reqt =>
            {
                res.send(reqt);
            });
});

app.post('/account/post', (req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    const errors = validationResult(req);

    if (!errors.isEmpty())
    {
        return res.status(422).jsonp(errors.array());
    }
    else
    {
        if (reqData.count((err,count) =>
        {
            if (!err && count==0)
            {
                reqData.counterReset('sno', err => {});
            }
        }));
        var dateString = new Date();
        var reqInfo = new reqData(
            {
                email: req.body.user.email,
                request: req.body.reqt.request,
                date: dateString.getDate()+'-'+(dateString.getMonth()+1)+'-'+dateString.getFullYear(),
                city: req.body.reqt.city,
                state: req.body.reqt.state,
                phone: req.body.reqt.phone
            }
        );
        reqInfo.save((err,data) =>
        {
            if (err)
            {
                res.status(500).json({msg: err});
            }
            res.status(200).json({msg: data});
        });
    }
    
});

app.put('/account/update', (req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    var dateString = new Date();
    var updateInfo = 
    {
        email: req.body.reqt.email,
        request: req.body.reqt.request,
        date: dateString.getDate()+'-'+(dateString.getMonth()+1)+'-'+dateString.getFullYear(),
        city: req.body.reqt.city,
        state: req.body.reqt.state,
        phone: req.body.reqt.phone
    };

    reqData.findByIdAndUpdate(req.body.reqt._id, updateInfo, (err,data) =>
    {
        if (err)
        {
            res.status(500).json({msg: err});
        }
        res.status(500).json({msg: data});
    });
    
});

app.delete('/account/delete/:id', (req,res,next) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    reqData.findOneAndDelete(
        {_id: req.params.id}, 
        {useFindAndModify: false},
        (err,reqt) =>
        {
            if (err)
            {
                res.status(500).json({msg: err});
            }
            else
            {
                res.status(200).json({msg: reqt});
            }
        }
    )
})

app.listen(port);

    
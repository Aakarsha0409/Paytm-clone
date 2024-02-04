const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const {User, Account} = require("../db.js")
const jwtSecret = require("../config.js");
const {createUser, SigninUser, updateUser} = require("../types.js");
const authMiddleware = require("../middleware.js");

router.get("/me", authMiddleware, async (req,res) => {
    const userId = req.userId;
    if(!userId){
        return res.status(403).json({msg : "Not logged in"});
    }
    const userdetails = await User.findById(userId);
    const accountdetails = await Account.findOne({userId : userId});
    res.json({
        user : {
        Username : userdetails.Username,
        Firstname : userdetails.Firstname,
        Lastname : userdetails.Lastname
        },
        account : {balance : accountdetails.balance}
        
    })
}); 

router.post("/signup",async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createUser.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    const existingUser = await User.findOne({Username: createPayload.Username});
    if(existingUser){
        return res.status(411).json({
            msg: "Username is already in use",
        });
    }
    const user = await User.create({
        Firstname: createPayload.Firstname,
        Lastname: createPayload.Lastname,
        Username: createPayload.Username,
        Password: createPayload.Password       
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({userId}, jwtSecret);
    res.status(200).json({
        message: "User created successfully",
        token: token
    })
})


router.post("/signin", async function(req, res){
    const createPayload = req.body;
    console.log(createPayload);
    const parsedPayload = SigninUser.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    const user = await User.findOne({Username : req.body.Username, Password : req.body.Password});
    if(user){
        const token = jwt.sign({userId: user._id}, jwtSecret);
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        msg: "Username does not exist",
    });

});


router.put("/", async (req,res) => {
    const {sucess} = updateUser.safeParse(req.body);
    if(!sucess){
        res.status(411).json({msg: "Error while updating information"})
    }
    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })

})

router.get("/bulk", async (req,res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            { Firstname: { "$regex": filter,"$options": "i" } },
            { Lastname: { "$regex": filter,"$options": "i" } }
        ]
    }).sort({Firstname : 1,Lastname: 1});;
    res.json({
        user: users.map(user => ({
            Username: user.Username,
            Firstname: user.Firstname,
            Lastname: user.Lastname,
            _id: user._id
        }))
    })
    
})

module.exports = router;
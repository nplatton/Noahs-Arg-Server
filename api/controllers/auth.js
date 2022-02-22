require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

async function register(req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        const result = await User.create({...req.body, password_digest: hashed})
        res.status(201).json({MSG:"user created!"})
    } catch (err) {
        res.status(500).json({err});
    }
}

async function login(req, res) {
    try {
        const user = await User.findByUsername(req.body.username)
        if(!user){ throw new Error('No user with this username') }
        console.log(req.body.password)
        console.log(user.passwordDigest)
        const authed = bcrypt.compareSync(req.body.password, user.password_digest)
        if (!!authed){
            const payload = { username: user.username, org : user.org }
            const sendToken = (err, token) => {
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.SECRET, { expiresIn: 1000 }, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err });
    }
}

module.exports = { register, login };
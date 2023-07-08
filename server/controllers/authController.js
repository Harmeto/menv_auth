import jsonwebtoken from "jsonwebtoken";
import bcrypt from 'bcrypt';

import User from "../models/User.js";

async function register(req, res){
    const {username, email, password, first_name, last_name, password_confirm } = req.body;

    if(!username || !email || !password || !password_confirm || !first_name || !last_name) return res.status(422).json({message:'Invalid fields'})

    if(password !== password_confirm) return res.status(422).json({message: 'Passwords do not match'})
    
    const userExist = await User.exists({email}).exec()

    if(userExist) return res.sendStatus(409)
   
    try{
        const hashedPassword = await bcrypt.hash(password, 10)
        
        await User.create({ email , username, password: hashedPassword, first_name, last_name})

        return res.sendStatus(201)
    }
    catch (e){
        return res.status(400).json({message: e.message})
    }

}
async function login(req, res){
    const {email, password} = req.body;

    if(!email || !password) return res.status(422).json({message:'Invalid fields'})

    const user = await User.findOne({email}).exec()

    if(!user) return res.status(401).json({message:"Email or password is incorrect"})

    const match = bcrypt.compareSync(password, user.password)

    if(!match) return res.status(401).json({message:"Email or password is incorrect"})

    const accessToken = jsonwebtoken.sign(
        {
            id: user.id
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'1800s'
        }
    )

    const refreshToken = jsonwebtoken.sign(
        {
            id: user.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:'1d'
        }
    )

    user.refresh_token = refreshToken

    await user.save()

    res.cookie('refresh_token', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000, sameSite: 'None', secure: true})

    res.json({'access_token': accessToken})

    
}
async function logout(req, res){
    const cookies = req.cookies

    if(!cookies.refresh_token) return res.sendStatus(204)

    const refreshToken = cookies.refresh_token

    const user = await User.findOne({refresh_token: refreshToken}).exec()

    if(!user){
        res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
        return res.sendStatus(204)
    }

    user.refresh_token = null
    await user.save()

    res.clearCookie('refresh_token',  {httpOnly: true, sameSite: 'None', secure: true})
    res.sendStatus(204)
}
async function refresh(req, res){
    const cookies = req.cookies;
    if(!cookies.refresh_token) return res.sendStatus(401)
    const refreshToken = cookies.refresh_token

    const user = await User.findOne({refresh_token: refreshToken}).exec()

    if(!user) return res.sendStatus(403)

    jsonwebtoken.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded)=>{
            if(err || user.id !== decoded.id) return res.sendStatus(403)

            const accessToken = jsonwebtoken.sign(
                {
                    id: decoded.id
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '1800s'
                }
            )

            res.json({access_token: accessToken})
        }
    )
}
async function user(req, res){
    
    const user = req.user
    
    return res.status(200).json(user);
}

export {register, login, logout, refresh, user}
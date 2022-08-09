const { user } = require('../models');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
require('dotenv').config()

class userController {
    static async register (req,res){
    try{
      const cekAvailability = await user.findOne({
        where :{
          username: req.body.username,
          email: req.body.email
        }
      })
      if (cekAvailability != null){
        return res.status(400).json({
          msg: 'Username or Email has been Taken'
        })
      }

     const hashedpassword = await bcrypt.hash(req.body.password, 12)
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword,
        }
    await user.create(newUser);

    return res.status(201).json({
        message: 'Successfully add user',
        user_email: newUser.email
      })
      
    }
    catch(err){
        return res
        .status(err.status ||  500)
        .json({ message: err.message || 'Internal server error' })
}
    }

    static async login(req,res){
    try{
        const userLogin = {
            email: req.body.email,
            password: req.body.password,
        }
        let u = await user.findOne({where:{email:userLogin.email}});
        if (u){
            const match = await bcrypt.compareSync(userLogin.password, u.password);
            if(match){
              const token = jwt.sign({
                id: u.id,
                username: u.username,
                email: u.email,
                roleType:u.roleType,
              }, process.env.SECRET_KEY,{expiresIn: '1h'});
              
                res.status(200).json({msg:'Successfully Login',token});
            }else{
                res.status(401).json('Wrong Password');
            }
        }else{
            res.status(401).json('User Not Found');
        }
    }

      catch (err) {
        return res
          .status(err.status || 500)
          .json({
            message: err.message || 'Internal server error.',
          })
      }
    }

    static async getAllUser(req, res) {
        const rows = await user.findAll({
            attributes:{exclude:['password']}
        });
    
        return res.status(200).json({
          message: 'Successfully get all User',
          data: rows
        })
    }

    static async getUserbyID(req, res) {
        try {
        const userID = req.params.id
        const rows = await user.findAll({
            where:{
              id: userID,
              },
              attributes:{exclude:['password']}
          }
        );  
        if (rows == 0){
            return res.status(404).json({
              message: "User not Found"
            })
          }
          else{
            return res.status(200).json({
              message: 'Succesfully get User Information',
              data: rows
            })}

        } catch (err) {
          return res
            .status(err.status ||  500)
            .json({ message: err.message || 'Internal server error' })
    }}

    static async editUserbyID(req, res) {
   try{
        await user.update({
            username: req.body.username
          },{
            where:{
              id:req.params.id
            }
          });
          return res.status(200).json({
              message: "Successfully change username."
          })
      } catch (err) {
          return res
            .status(err.status || 500)
            .json({
              message: err.message || 'Internal server error.',
            })
        }   
    }

    static async deleteUser(req, res) {
        try {
          if (!req.params.id) return { status: 400, message: 'ID cannot be empty' }
    
          await user.destroy({
            where: { id: req.params.id }
          });
    
          return res.status(200).json({
            message: 'Successfully delete User'
          })
        } catch (err) {
          return res
            .status(err.status ||  500)
            .json({ message: err.message || 'Internal server error' })
    }}
}



module.exports = userController;
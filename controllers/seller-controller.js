const { seller } = require('../models');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const mail = require ('../config/mail');
require('dotenv').config()

class sellerController{
    static async register (req,res){
        try{
        const cekSeller = await seller.findOne({
            where:{
                email:req.body.email
            }
        });
        if (cekSeller!=null){
            return res.status(400).json({
                error: 'Email has been Used.'
            });
        }

        const hashedpassword = await bcrypt.hash(req.body.password, 12)
            const newSeller = {
               firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedpassword,
                address: req.body.address, 
            }
        
        await mail.sendMail({
          from: process.env.MAIL_EMAIL,
          to:req.body.email,
          subject: 'Registration Confirmation',
          text:'JWT Token',
        })
        await seller.create(newSeller);
    
        return res.status(201).json({
            message: 'Successfully add seller',
            user_email: newSeller.email
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
            const sellerLogin = {
                email: req.body.email,
                password: req.body.password,
            }
            let u = await seller.findOne({where:{email:sellerLogin.email}});
            if (u){
                const match = await bcrypt.compareSync(sellerLogin.password, u.password);
                if(match){
                  const token = jwt.sign({
                    id: u.id,
                    username: u.username,
                    email: u.email,
                    roleType:u.roleType,
                  }, process.env.SECRET_KEY,{expiresIn: '1h'});
                    res.status(200).json({msg:'Successfully Login',token});
                }else{
                    res.status(403).json('Wrong Password');
                }
            }else{
                res.status(401).json('Seller Not Found');
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
    
    static async getAllSeller(req, res) {
            const rows = await seller.findAll({
                attributes:{exclude:['password']}
            });
        
            return res.status(200).json({
              message: 'Successfully get all Seller',
              data: rows
            })
    }

    static async getSellerbyID(req, res) {
            try {
            const sellerID = req.params.id
            const rows = await seller.findAll({
                where:{
                  id: sellerID,
                  },
                  attributes:{exclude:['password']}
              }
            );  
            if (rows == 0){
                return res.status(404).json({
                  message: "Item not Found"
                })
              }
              else{
                return res.status(200).json({
                  message: 'Succesfully get Seller Information',
                  data: rows
                })}

            } catch (err) {
              return res
                .status(err.status ||  500)
                .json({ message: err.message || 'Invalid Input' })
    }}

    static async editSellerbyID(req, res) {
              try{
                   await seller.update({
                       firstName: req.body.firstName,
                       lastName: req.body.lastName,
                       address: req.body.address
                     },{
                       where:{
                         id:req.params.id
                       }
                     });
                     return res.status(200).json({
                         message: "Successfully change information"
                     })
                 } catch (err) {
                     return res
                       .status(err.status || 500)
                       .json({
                         message: err.message || 'Internal server error.',
                       })
                   }   
    }

    static async deleteSeller(req, res) {
            try {
              if (!req.params.id) throw { status: 400, message: 'ID cannot be empty' };
        
              await seller.destroy({
                where: { id: req.params.id }
              });
        
              return res.status(200).json({
                message: 'Successfully delete Seller'
              })
            } catch (err) {
              return res
                .status(err.status ||  500)
                .json({ message: err.message || 'Internal server error' })
    }}
}


module.exports = sellerController;
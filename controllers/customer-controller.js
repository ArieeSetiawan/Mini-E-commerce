const { customer } = require('../models');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
require('dotenv').config()

class customerController{
    static async register (req,res){
        try{
        const cekCust = await customer.findOne({
            where:{
                email:req.body.email
            }
        });
        if (cekCust!=null){
            return res.status(400).json({
                error: 'Email has been Used.'
            });
        }

        const hashedpassword = await bcrypt.hash(req.body.password, 12)
            const newCust = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedpassword,
                address: req.body.address,
            }

        await customer.create(newCust);
    
        return res.status(201).json({
            message: 'Successfully add customer',
            user_email: newCust.email
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
            const custLogin = {
                email: req.body.email,
                password: req.body.password,
            }
            let u = await customer.findOne({where:{email:custLogin.email}});
            if (u){
                const match = await bcrypt.compareSync(custLogin.password, u.password);
                if(match){
                  const token = jwt.sign({
                    id: u.id,
                    name: u.firstName,
                    email: u.email,
                    roleType:u.roleType,
                  }, process.env.SECRET_KEY,{expiresIn: '1h'});
                    res.status(200).json({msg:'Successfully Login',token});
                }else{
                    res.status(403).json('Wrong Password');
                }
            }else{
                res.status(401).json('Customer Not Found');
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
    
    static async getAllCustomer(req, res) {
            const rows = await customer.findAll({
                attributes:{exclude:['password']}
            });
        
            return res.status(200).json({
              message: 'Successfully get all Customer',
              data: rows
            })
    }

    static async getCustomerbyID(req, res) {
            try {
            const custID = req.params.id
            const rows = await customer.findAll({
                where:{
                  id: custID,
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

    static async editCustomerbyID(req, res) {
              try{
                   await customer.update({
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

    static async deleteCustomer(req, res) {
            try {
              if (!req.params.id) throw { status: 400, message: 'ID cannot be empty' };
        
              await customer.destroy({
                where: { id: req.params.id }
              });
        
              return res.status(200).json({
                message: 'Successfully delete Customer'
              })
            } catch (err) {
              return res
                .status(err.status ||  500)
                .json({ message: err.message || 'Internal server error' })
    }}
}


module.exports = customerController;
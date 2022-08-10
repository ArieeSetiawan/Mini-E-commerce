const { item } = require('../models');
const { upload } =require ('../helper/cloudinary-upload')
const { delImage } =require ('../helper/cloudinary-destroy')
const fs = require ('fs');
const uuid = require('uuid');
const {itemgallery} = require('../models/');
const { image } = require('../config/cloudinary');
const { url } = require('inspector');

class itemController{
    static async createItem (req,res){
        const newitemID = uuid.v4();
        try{
        for(let i = 0 ; i < req.files.length ; i++){
            const uploadItem= await upload (req.files[i].path)
            fs.unlinkSync(req.files[i].path)
            await itemgallery.create({
              url: uploadItem.secure_url,
              item_id: newitemID,
              public_id: uploadItem.public_id,
              asset_id: uploadItem.asset_id,
          })
          }
          
          await item.create({
            id: newitemID,
            title: req.body.title,
            price: req.body.price,
            stock: req.body.stock,
            sellerID: req.user.id,
            image: ''
          })

            return res.status(201).json({
                message: 'Successfully add Item',
                id: newitemID
              })
        }
        catch(err){
            return res
            .status(err.status ||  500)
            .json({ message: err.message || 'Internal server error' })
    }  
    }
    static async getAllItem(req, res) {
        const rows = await item.findAll({
        });
    
        return res.status(200).json({
          message: 'Successfully get all Item',
          data: rows
        })
    }
    
    static async getItemBySellerID(req, res) {
        try {
            const getsellerID = req.params.id
            const rows = await item.findAll({
                where:{
                  sellerID: getsellerID,
                  },
              }
            );  
            if (rows == 0){
                return res.status(404).json({
                  message: "Seller not Found"
                })
              }
              else{
                return res.status(200).json({
                  message: 'Succesfully get Item Information',
                  data: rows
                })}

            } catch (err) {
              return res
                .status(err.status ||  500)
                .json({ message: err.message || 'Invalid Input' })
            }
    }

    static async getItemByID(req, res) {
        try {
            const getitemID = req.params.id
            const rows = await item.findAll({
                where:{
                  id: getitemID,
                  },
                  // include:[{
                  //   model: itemgallery,
                  //   attributes: ['url'],
                  //   as:'itemimage'
                  // }]
              }
            );
            if (rows == 0){
                return res.status(404).json({
                  message: "Item not Found"
                })
              }
              else{
                return res.status(200).json({
                  message: 'Succesfully get Item Information',
                  data: rows,
                })}

            } catch (err) {
              return res
                .status(err.status ||  500)
                .json({ message: err.message || 'Invalid Input' })
            }
    }

    static async editItem(req, res) {
        try { 
        let u = await item.findOne({where:{id:req.params.id}});
        if(u.sellerID === req.user.id){
            await item.update({
                title:req.body.title,
                price:req.body.price,
                stock:req.body.stock
            },{
                where: { id: req.params.id }
              });   
            return res.status(200).json({
                message: 'Successfully Edit Item'
              })
        }else{
            return res.status(401).json({
                message: 'You are not authorize for this Item'
              })
        }
        } catch (err) {
          return res
            .status(err.status ||  500)
            .json({ message: err.message || 'Internal server error' })
    }}

    static async deleteItem(req, res) {
        try { 
        let u = await item.findOne({where:{id:req.params.id}});
        const y = await itemgallery.findAll({
          attributes:['public_id'],
          where:{
            item_id: req.params.id,
            },
        })
        
        for(let i = 0 ; i < y.length ; i++){
            await delImage(y[i].public_id)
        }
        if(u.sellerID === req.user.id){
            await item.destroy({
                where: { id: req.params.id }
              });
            await itemgallery.destroy({
                where: { item_id: req.params.id}
            })   
            return res.status(200).json({
                message: 'Successfully delete Item'
              })
        }else{
            return res.status(401).json({
                message: 'You cant delete this item because its not yours'
              })
        }
        } catch (err) {
          return res
            .status(err.status ||  500)
            .json({ message: err.message || 'Internal server error' })
    }}
}

module.exports = itemController
const { order } = require('../models');
const fs = require ('fs');
const uuid = require('uuid');
const {item} = require('../models/');


class orderController{
    static async createOrder(req,res){
    const neworderid = uuid.v4();
    try{
      let cekItem = await item.findOne({where:{
      id: req.body.item_id
    },
  })

    if(cekItem==null){
      return res.status(404).json({message:"Item Not Found"})
    };

    const newOrder = {
      id: neworderid,
      customer_id:req.user.id,
      item_id:cekItem.id,
      qty: req.body.qty,
      total: cekItem.price*req.body.qty,
    }
    await order.create(newOrder)

    return res.status(201).json({
          message: 'Successfully add Order',
          id: newOrder.id,
          total: newOrder.total
        })

    }
    catch(err){
      return res
      .status(err.status ||  500)
      .json({ message: err.message || 'Internal server error' })
    }
  }

    static async getAllOrderfromCustID(req,res){
      try {
        const getcustID = req.user.id
        const rows = await order.findAll({
            where:{
              customer_id: getcustID,
              },
              include:[{
                model: item,
                attributes: ['title'],
              }]
          }
        );  
        if (rows == 0){
            return res.status(404).json({
              message: "Order not Found"
            })
          }
          else{
            return res.status(200).json({
              message: 'Succesfully get Order Information',
              data: rows
            })}

        } catch (err) {
          return res
            .status(err.status ||  500)
            .json({ message: err.message || 'Invalid Input' })
        }
    }

    static async getOrderbyID(req,res){
      try {
        const rows = await order.findAll({
            where:{
              id: req.params.id,
              },
              include:[{
                model: item,
                attributes: ['title'],
              }]
          }
        );  
        if (rows == 0){
            return res.status(404).json({
              message: "Order not Found"
            })
          }
          else{
            return res.status(200).json({
              message: 'Succesfully get Order Information',
              data: rows
            })}

        }catch (err) {
          return res
            .status(err.status ||  500)
            .json({ message: err.message || 'Invalid Input' })
        }
    }

    static async updateOrder(req,res){
      try {
        await order.update({
            statusOrder:req.body.status
          },{
            where:{
              id: req.params.id,
            }
          });          
            return res.status(201).json({
              message: 'Succesfully change Order Status',
            })

        }catch (err) {
          return res
            .status(err.status ||  500)
            .json({ message: err.message || 'Invalid Input' })
        }
    }

    static async deleteOrder(req,res){
            try {
              if (!req.params.id) throw { status: 400, message: 'ID cannot be empty' };
        
              await order.destroy({
                where: { id: req.params.id }
              });
        
              return res.status(200).json({
                message: 'Successfully delete Seller'
              })
            } 
            catch (err) {
              return res
                .status(err.status ||  500)
                .json({ message: err.message || 'Internal server error' })
    }
    }
}

module.exports = orderController
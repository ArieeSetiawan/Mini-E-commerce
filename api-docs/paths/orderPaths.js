module.exports={
    '/orders/':{
        post: {
            tags: ["Orders"],
            summary: "Create Order",
            description: "An endpoint to create Order",
            requestBody: {
              required: true,
              content: {
                'application/x-www-form-urlencoded': {
                  schema: {
                    type: 'object',
                    properties: {
                      item_id: {
                        type: 'UUID',
                      },
                      qty: {
                        type: 'integer',
                      },
                    },
                    required: [
                      'item_id',
                      'qty',
                    ]
                  },
                }
              }
            },
            responses: {
              200: {
                content: {
                  'application/json': {
                    example: {
                      status: 201,
                      message: 'Create item success',
                    }
                  }
                }
              }
            },
            security: [
              {
                token: []
              }
            ]
          },
              
    },
    '/orders/{id}':{
      get: {
          tags: ["Orders"],
          summary: "Get Order from Customer ID",
          description: "An endpoint to get Order from customer ID",
          responses: {
            200: {
              content: {
                'application/json': {
                  example: {
                    status: 201,
                    message: 'Create item success',
                  }
                }
              }
            }
          },
          security: [
            {
              token: []
            }
          ]
        },
        put: {
          tags: ["Orders"],
          summary: "Edit Order from Order ID",
          description: "An endpoint to get Order from order ID",
          parameters:[{
            name: "id",
            in: "path",
            required: true,
            type: "uuid",
        }],
          responses: {
            200: {
              content: {
                'application/json': {
                  example: {
                    status: 201,
                    message: 'Create item success',
                  }
                }
              }
            }
          },
          security: [
            {
              token: []
            }
          ]
        },          
  }
}
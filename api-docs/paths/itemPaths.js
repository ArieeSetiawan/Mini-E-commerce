module.exports = {
    '/items/create': {
        post: {
          tags: ["Items"],
          summary: "Create Item",
          description: "An endpoint to create Item",
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                    },
                    price: {
                      type: 'integer',
                    },
                    stock: {
                      type: 'integer',
                    },
                    image:{
                      type: 'array',
                      items:{
                        type: 'string',
                        format: 'binary'
                      }
                    }
                  },
                  required: [
                    'title',
                    'price',
                    'stock',
                    'image',
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
        }
},
    '/items/':{
      get: {
        tags: ["Items"],
        summary: "Get All Items",
        description: "An endpoint to get All Item",
        responses:{
          content: {
            'application/json': {
              example:{
                  status: 200,
                  message: 'Successfully get all Item',
                  list : [
                      {
                          id: 'abcd-efgh',
                          username: 'Abc123',
                          email: 'Abc@mail.com',
                          createdAt: '',
                          createdBy: '',
                      }
                  ],
              },
              401:{
                  content: {
                      'application/json': {
                        example: {
                          status: 401,
                          message: 'Cannot Access this Page'
                        }
                      }
                    }
                }
            }       
        },
      },
      },
      
},
    '/items/{id}':{
      get: {
        tags: ["Items"],
        summary: "Get Items by ID",
        description: "An endpoint to get Item by ID",
          parameters:[{
          name: "id",
          in: "path",
          required: true,
          type: "uuid",
      },
    ],
        responses:{
          content: {
            'application/json': {
              example:{
                  status: 200,
                  message: 'Successfully get Customer',
                  list : [
                      {
                          id: 'abcd-efgh',
                          username: 'Abc123',
                          email: 'Abc@mail.com',
                          createdAt: '',
                          createdBy: '',
                      }
                  ]
              },
              401:{
                  content: {
                      'application/json': {
                        example: {
                          status: 401,
                          message: 'Cannot Access this Page'
                        }
                      }
                    }
                }
            },
                   
        },
      },
      },
      put: {
        tags: ["Items"],
        summary: "Edit Item by ID",
        description: "An endpoint to Edit Item by ID",
          parameters:[
            {
          name: "id",
          in: "path",
          required: true,
          type: "string",
      },     
    ],
    requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                },
                price: {
                  type: 'string',
                },
                stock: {
                  type: 'string',
                },
              },
              required: [
                'title',
                'price',
                'stock'
              ]
            },
          }
        }
      },
        responses:{
          content: {
            'application/json': {
              example:{
                  status: 200,
                  message: 'Successfully get all User',
                  list : [
                      {
                          id: 'abcd-efgh',
                          username: 'Abc123',
                          email: 'Abc@mail.com',
                          createdAt: '',
                          createdBy: '',
                      }
                  ]
              },
              401:{
                  content: {
                      'application/json': {
                        example: {
                          status: 401,
                          message: 'Cannot Access this Page'
                        }
                      }
                    }
                }
            },
                   
        },
      },
      security: [
          {
            token: []
          }
        ]
      },
      delete: {
        tags: ["Items"],
        summary: "Delete Item by ID",
        description: "An endpoint to Delete Item by ID",
          parameters:[
            {
          name: "id",
          in: "path",
          required: true,
          type: "string",
      },     
    ],
        responses:{
          content: {
            'application/json': {
              example:{
                  status: 200,
                  message: 'Successfully get all User',
                  list : [
                      {
                          id: 'abcd-efgh',
                          username: 'Abc123',
                          email: 'Abc@mail.com',
                          createdAt: '',
                          createdBy: '',
                      }
                  ]
              },
              401:{
                  content: {
                      'application/json': {
                        example: {
                          status: 401,
                          message: 'Cannot Access this Page'
                        }
                      }
                    }
                }
            },
                   
        },
      },
      security: [
          {
            token: []
          }
        ]
      },
},
    '/items/seller/{id}':{
      get: {
        tags: ["Items"],
        summary: "Get Items by Seller ID",
        description: "An endpoint to get Item by Seller ID",
          parameters:[{
          name: "id",
          in: "path",
          required: true,
          type: "uuid",
      },
    ],
        responses:{
          content: {
            'application/json': {
              example:{
                  status: 200,
                  message: 'Successfully get Customer',
                  list : [
                      {
                          id: 'abcd-efgh',
                          username: 'Abc123',
                          email: 'Abc@mail.com',
                          createdAt: '',
                          createdBy: '',
                      }
                  ]
              },
              401:{
                  content: {
                      'application/json': {
                        example: {
                          status: 401,
                          message: 'Cannot Access this Page'
                        }
                      }
                    }
                }
            },
                   
        },
      },
      },
},
}
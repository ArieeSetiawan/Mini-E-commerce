const { STRING } = require("sequelize");

module.exports = {
    '/sellers/register': {
        post: {
          tags: ["Seller"],
          summary: "Create Seller",
          description: "An endpoint to add Seller",
          requestBody: {
            required: true,
            content: {
              'application/x-www-form-urlencoded': {
                schema: {
                  type: 'object',
                  properties: {
                    firstName: {
                      type: 'string',
                    },
                    lastName: {
                      type: 'string',
                    },
                    email: {
                      type: 'string',
                    },
                    password: {
                      type: 'string',
                    },
                    address: {
                      type: 'string',
                    },
                  },
                  required: [
                    'firstName',
                    'lastName',
                    'email',
                    'password',
                    'address',
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
                    message: 'Register success',
                  }
                }
              }
            }
          }
        }
},
    '/sellers/login': {
    post: {
      tags: ["Seller"],
      summary: "Login Seller",
      description: "An endpoint to Login Seller",
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
              required: [
                'email',
                'password'
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
                message: 'Login success',
                token : ''
              }
            }
          }
        }
      }
    }
},
    '/sellers/': {
    get: {
      tags: ["Seller"],
      summary: "Get All Seller",
      description: "An endpoint to get All Seller",
      responses:{
        content: {
          'application/json': {
            example:{
                status: 200,
                message: 'Successfully get all Seller',
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
    security: [
        {
          token: []
        }
      ]
    },
    
},
'/sellers/{id}': {
    get: {
      tags: ["Seller"],
      summary: "Get Seller by ID",
      description: "An endpoint to get User by ID",
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
    put: {
        tags: ["Seller"],
        summary: "Edit Seller by ID",
        description: "An endpoint to Edit Seller by ID",
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
                firstName: {
                  type: 'string',
                },
                lastName: {
                  type: 'string',
                },
                address: {
                  type: 'string',
                },
              },
              required: [
                'firstName',
                'lastName',
                'address'
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
        tags: ["Seller"],
        summary: "Delete Seller by ID",
        description: "An endpoint to Delete Seller by ID",
          parameters:[{
          name: "id",
          in: "path",
          required: true,
          type: "string",
      }],
        responses:{
          content: {
            'application/json': {
              example:{
                  status: 200,
                  message: 'Successfully delete Seller',
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
}
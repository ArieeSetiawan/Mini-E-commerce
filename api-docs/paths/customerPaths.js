const { STRING } = require("sequelize");

module.exports = {
    '/customers/register': {
        post: {
          tags: ["Customer"],
          summary: "Create Customer",
          description: "An endpoint to add Customer",
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
    '/customers/login': {
    post: {
      tags: ["Customer"],
      summary: "Login Customer",
      description: "An endpoint to Login Customer",
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
    '/customers/': {
    get: {
      tags: ["Customer"],
      summary: "Get All Customer",
      description: "An endpoint to get All Customer",
      responses:{
        content: {
          'application/json': {
            example:{
                status: 200,
                message: 'Successfully get all Customer',
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
    '/customers/{id}': {
    get: {
      tags: ["Customer"],
      summary: "Get Customer by ID",
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
    security: [
        {
          token: []
        }
      ]
    },
    put: {
        tags: ["Customer"],
        summary: "Edit Customer by ID",
        description: "An endpoint to Edit Customer by ID",
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
        tags: ["Customer"],
        summary: "Delete Customer by ID",
        description: "An endpoint to Delete Customer by ID",
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
                  message: 'Successfully delete Customer',
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
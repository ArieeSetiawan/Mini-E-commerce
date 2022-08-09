const { STRING } = require("sequelize");

module.exports = {
    '/users/register': {
        post: {
          tags: ["User"],
          summary: "Create User",
          description: "An endpoint to add User",
          requestBody: {
            required: true,
            content: {
              'application/x-www-form-urlencoded': {
                schema: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string',
                    },
                    email: {
                      type: 'string',
                    },
                    password: {
                      type: 'string',
                    },
                  },
                  required: [
                    'username',
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
                    message: 'Register success',
                  }
                }
              }
            }
          }
        }
},
    '/users/login': {
    post: {
      tags: ["User"],
      summary: "Login User",
      description: "An endpoint to Login User",
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
    '/users/': {
    get: {
      tags: ["User"],
      summary: "Get All User",
      description: "An endpoint to get All User",
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
'/users/{id}': {
    get: {
      tags: ["User"],
      summary: "Get User by ID",
      description: "An endpoint to get User by ID",
        parameters:[{
        name: "id",
        in: "path",
        required: true,
        minimum: 1,
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
        tags: ["User"],
        summary: "Edit User by ID",
        description: "An endpoint to Edit User by ID",
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
                username: {
                  type: 'string',
                },
              },
              required: [
                'username'
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
        tags: ["User"],
        summary: "Delete User by ID",
        description: "An endpoint to Delete User by ID",
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
}
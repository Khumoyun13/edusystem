export default {
  openapi: "3.0.0",
  info: {
    title: "Edusystem.uz",
    version: "1.0.0",
    description: "modern, easy, comfortable - learning",
  },
  // servers: [{ url: "http://localhost:3300" }],
  apis: ["./src/routes/*Route.js"],
  paths: {
    "/users/signup": {
      post: {
        summary: "Registering new user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  bdate: { type: "string" },
                  gender: { type: "string" },
                  phone: { type: "string" },
                  password: { type: "string" },
                },
                example: {
                  name: "Khumoyun",
                  email: "khumoyun@gmail.com",
                  bdate: "2002-09-13",
                  gender: "male",
                  phone: "998977222829",
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered",
          },
          400: {
            description: "User not registered",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/users/login": {
      post: {
        summary: "User login by email",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: "string",
                  password: "string",
                },
                example: {
                  email: "khumoyun@gmail.com",
                  password: "test_password",
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User login",
          },
          401: {
            description: "User login failed",
          },
          501: {
            description: "Internal server error",
          },
        },
      },
    },
    "/users/validate-code": {
      post: {
        summary: "Validate code that is sent to user email",
        parameters: [
          {
            in: "header",
            required: true,
            name: "validation-id",
            value: "test_id",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                  },
                },
                example: {
                  code: "xxxxxx",
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Code validated",
          },
          401: {
            description: "Code validation failed",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/users/resend-code": {
      post: {
        summary: "Resend code if sent code expires",
        parameters: [
          {
            in: "header",
            required: true,
            name: "validation-id",
            value: "test_id",
            schema: { type: "string" },
          },
        ],
        responses: {
          201: {
            description: "Code resent",
          },
          401: {
            description: "Code resent failed",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/users/set-password": {
      post: {
        summary: "Set user password",
        parameters: [
          {
            in: "header",
            required: true,
            name: "validation-id",
            value: "test_userid",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  password: {
                    type: "string",
                  },
                },
                example: {
                  password: "test_password",
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Password set",
          },
          401: {
            description: "Password set failed",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/users/edit": {
      post: {
        summary: "Edit user information",
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            value:
              "TEST_TOKEN => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjkwMTk2M30.AVtHi1NttVEQhMPQw8r_XePFGSuleIdqEtjnbnpaF_g",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  gender: { type: "string" },
                  bdate: { type: "string" },
                  phone: { type: "string" },
                  password: {
                    type: "string",
                  },
                },
                example: {
                  name: "test example",
                  gender: "test example",
                  bdate: "test example",
                  phone: "test example",
                  password: "test example",
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User edited",
          },
          401: {
            description: "User edit failed",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/users/get": {
      get: {
        summary: "Get all users",
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            value:
              "TEST_TOKEN => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjkwMTk2M30.AVtHi1NttVEQhMPQw8r_XePFGSuleIdqEtjnbnpaF_g",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          201: {
            description: "Successfully get all users",
          },
          401: {
            description: "Cannot get users",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/users/promote": {},
  },
};

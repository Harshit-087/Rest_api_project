
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "REST API with JWT Authentication and Role Access",
    },
    servers: [
      {
        url: process.env.BACKEND_URL,
      },
    ],
  },
  apis: ["./routers/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export  default swaggerSpec;
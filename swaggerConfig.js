const express = require("express");
const os = require("os");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pruebas",
      version: "1.0.0",
      description: "Documentación generada con swagger-jsdoc",
    },
  },
  apis: ["./routes/*.js"], // archivos con comentarios OpenAPI
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
module.exports = swaggerSpec;

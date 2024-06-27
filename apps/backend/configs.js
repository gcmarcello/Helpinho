/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require("dotenv");
const path = require("path");

module.exports = async ({ options, resolveConfigurationProperty }) => {
  const envVars = dotenv.config({
    path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
  }).parsed;
  return Object.assign({}, envVars);
};

import dotenv from "dotenv";
import path from "path";

const cwd = process.cwd() || "";

dotenv.config({
  path: path.resolve(cwd, `.env.${process.env.NODE_ENV}`),
});

export default dotenv;

import mongoose from "mongoose";
import { ApiError } from "../utils/Api.Error.js";
const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.error || [err.stack]);
  }

  const response = {
    statusCode: error.statusCode,
    success: error.success,
    message: error.message,
    error: error.error,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};

export {errorHandler}
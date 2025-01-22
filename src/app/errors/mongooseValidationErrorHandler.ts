import mongoose from "mongoose";
import { TErrorMessage, TGenericErrorResponse } from "../interface/error";

const mongooseValidationErrorHandler = (
  error: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorMessage: TErrorMessage = Object.values(error.errors).map(
    (err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: err?.path,
        message: err?.message,
      };
    }
  );
  return {
    statusCode: 400,
    message: error.message,
    errorMessage,
  };
};

export default mongooseValidationErrorHandler;
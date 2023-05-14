import Response from "../utils/Response";
import httpStatus from "http-status";

export const verifyPatientAccess = async (req, res, next) => {
  try {
    const { patient, _id } = req.query;

    if (req.payload.patient === patient || req.payload.patient === _id) {
      return next();
    }
    // I will need to verify scopes here???
    return Response.errorMessage(
      res,
      "Unauthorized! You don't have access to this data",
      httpStatus.UNAUTHORIZED
    );
  } catch (error) {
    // console.log(error.message);
    Response.errorMessage(
      res,
      "Internal server error!",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

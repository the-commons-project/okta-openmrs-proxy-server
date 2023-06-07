import Response from "../utils/Response";
import status from "http-status";
import { decodeToken } from "../utils/token";
export const verifyUserToken = async (req, res, next) => {
  try {
    const _token =
      req.header("authorization") ||
      req.params["authorization"] ||
      req.body.token ||
      req.query["authorization"] ||
      req.cookies.authorization;
    const token = _token?.split(" ")[1].trim();
    if (!token) {
      return Response.errorMessage(
        res,
        "Please your are not authorized to access this information! Please login with true credentials!",
        status.UNAUTHORIZED
      );
    }
    const payload = decodeToken(token);
    const { patient, launch_response_patient, name } = payload;
    // console.log(payload);
    if (name === "JsonWebTokenError") {
      return Response.errorMessage(
        res,
        "unauthorized, invalid token",
        status.UNAUTHORIZED
      );
    } else if (name === "TokenExpiredError") {
      return Response.errorMessage(
        res,
        "Token expired, invalid token",
        status.UNAUTHORIZED
      );
    }
    if (!patient && !launch_response_patient) {
      return Response.errorMessage(
        res,
        "Patient from token not exist, invalid token",
        status.UNAUTHORIZED
      );
    }
    // console.log(payload);
    req.payload = payload;
    if (launch_response_patient) {
      req.payload.patient = launch_response_patient;
    }
    console.log(
      "(----------------------------------------------------------------)"
    );
    // console.log(req.payload);
    return next();
  } catch (error) {
    console.log(error.message);
    if (error?.message === "jwt expired") {
      console.log("))))))))");
      return Response.errorMessage(
        res,
        "Your session has been expired! Please re-login!",
        status.UNAUTHORIZED
      );
    }
    return Response.errorMessage(
      res,
      "FAILED TO VERIFY TOKEN !",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

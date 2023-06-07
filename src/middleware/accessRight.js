import Response from "../utils/Response";
import httpStatus from "http-status";

const scopes = ["openid", "launch", "launch/patient", "patient/*.read"];

function filterPatientValues(array, value) {
  return array
    .filter((va) => va.includes(value))
    .map((val) => val.replace(value, ""));
}

function checkMethodExistence(array, method) {
  var methods = { get: "r", post: "c", patch: "u", delete: "d", search: "s" };

  return array.includes(methods[method]);
}

export const verifyPatientAccess = async (req, res, next) => {
  try {
    const { patient, launch_response_patient, _id } = req.query;
    const scopes = filterPatientValues(req.payload.scp, "patient/");
    // const scopes = filterPatientValues(
    //   ["patient/patient.r", "patient/patient.c"],

    //   "patient/"
    // );

    if (
      req.payload.patient === patient ||
      req.payload.patient === launch_response_patient ||
      req.payload.patient === _id
    ) {
      if (req.payload.scp.includes("openid")) {
        if (req.payload.scp.includes("launch/patient")) {
          return next();
          //--------------------------------------------------------> To Allow Scopes Uncomment the following lines -------------------------------------------------------->
          // if (scopes.length > 0) {
          //   const authScopes = filterPatientValues(
          //     scopes,
          //     `${req.params.path.toLowerCase()}.`
          //   );
          //   // console.log(authScopes, req.method);
          //   if (authScopes.length > 0) {
          //     if (checkMethodExistence(authScopes, req.method.toLowerCase())) {
          //       return next();
          //     }
          //     return Response.errorMessage(
          //       res,
          //       "Unauthorized! No permission based on scope operation you provided, please,check your consent.",
          //       httpStatus.UNAUTHORIZED
          //     );
          //   }
          //   return Response.errorMessage(
          //     res,
          //     "Unauthorized! No permission scope syntax is not valid. Missing scope operation. eg: patient/*.r ",
          //     httpStatus.BAD_REQUEST
          //   );
          // }
          // return Response.errorMessage(
          //   res,
          //   "Unauthorized! No permission to retrieve information about the current patient. Missing scope to authorise eg: patient/*.r ",
          //   httpStatus.UNAUTHORIZED
          // );
        }

        return Response.errorMessage(
          res,
          "Unauthorized! No permission to retrieve information about the current logged-in user. launch/patient missing",
          httpStatus.UNAUTHORIZED
        );
      }

      return Response.errorMessage(
        res,
        "Unauthorized! No permission to retrieve information about the current logged-in user. openid missing",
        httpStatus.UNAUTHORIZED
      );
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

import httpStatus from "http-status";
import axios from "axios";
import FhirRequest from "../utils/HttpRequest";
import Response from "../utils/Response";

function objectToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      keyValuePairs.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      );
    }
  }
  return `?${keyValuePairs.join("&")}`;
}

export const callFhirApi = async (req, res) => {
  try {
    const response = await FhirRequest.get(
      `${req.params.path}${objectToQueryString(req.query)}`
    );
    return res.status(response.status).json(response.data);
  } catch (e) {
    console.log(e);
    return Response.errorMessage(res, `Failed! ${req.params.path} is not supported with OPENMRS yet!`, httpStatus.NOT_FOUND);
  }
};

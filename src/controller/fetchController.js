import httpStatus from "http-status";
import axios from "axios";
import FhirRequest from "../utils/HttpRequest";


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
  const response = await FhirRequest.get(
    `${req.params.path}${objectToQueryString(req.query)}`
  );
  return res.status(response.status).json(response.data);
};

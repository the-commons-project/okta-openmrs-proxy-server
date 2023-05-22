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

export const welcomeFhir = async (req, res) => {
  return Response.succesMessage(res,"Welcome to Patholar FHIR APIs",null,httpStatus.OK);
};

export const callFhirApi = async (req, res) => {
  try {
    // console.log(req.method);
    const response = await FhirRequest.get(
      `${req.params.path}${objectToQueryString(req.query)}`
    );
    return res
      .status(response.status ?? httpStatus.NOT_FOUND)
      .json(response.data);
  } catch (e) {
    console.log(e);
    return Response.errorMessage(
      res,
      `Failed! ${req.params.path} is not supported with OPENMRS yet!`,
      httpStatus.NOT_FOUND
    );
  }
};

export const callWellKnown = async (req, res) => {
  try {
    const response = await axios.get(
      "https://dev-96526247.okta.com/oauth2/aus9nb5v06MbLCO115d7/.well-known/oauth-authorization-server"
    );

    return res.status(response.status).json({
      ...response.data,
      issuer: "https://www.patholar.co.uk/oauth2/aus9nb5v06MbLCO115d7",
      authorization_endpoint:
        "https://www.patholar.co.uk/oauth2/aus9nb5v06MbLCO115d7/smart/v1/authorize",
      token_endpoint:
        "https://www.patholar.co.uk/oauth2/aus9nb5v06MbLCO115d7/v1/token",
      registration_endpoint:
        "https://www.patholar.co.uk/oauth2/aus9nb5v06MbLCO115d7/v1/clients",
      introspection_endpoint:
        "https://www.patholar.co.uk/oauth2/aus9nb5v06MbLCO115d7/v1/introspect",
      jwks_uri:
        "https://www.patholar.co.uk/oauth2/aus9nb5v06MbLCO115d7/v1/keys",
    });
  } catch (err) {
    return Response.errorMessage(res, `Failed!`, httpStatus.NOT_FOUND);
  }
};

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
  return Response.succesMessage(
    res,
    "Welcome to Patholar FHIR APIs",
    null,
    httpStatus.OK
  );
};

export const callFhirApi = async (req, res) => {
  try {
    console.log(req.method);
    const { category } = req.query;
    if (category === "vital-signs") {
      // console.log(category);
      req.query.category = "exam";
    }
    const response = await FhirRequest.get(
      `${req.params.path}${objectToQueryString(req.query)}`
    );
    if (category === "vital-signs") {
      response.data = JSON.parse(
        JSON.stringify(response.data)
          .replace(/exam/g, "vital-signs")
          .replace(/Exam/g, "vital-signs")
      );
    }

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

export const callFhirApiById = async (req, res) => {
  try {
    const response = await FhirRequest.get(
      `${req.params.path}/${req.params.id}`
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
      "https://auth.patholar.co.uk/sof/.well-known/smart-configuration"
    );

    return res.status(response.status).json(response.data);
    //     {
    //     ...response.data,
    //     issuer: "https://sof.patholar.co.uk/oauth2/aus9rznmmbdD0a4zB5d7",
    //     authorization_endpoint:
    //       "https://sof.patholar.co.uk/oauth2/aus9rznmmbdD0a4zB5d7/smart/v1/authorize",
    //     token_endpoint:
    //       "https://sof.patholar.co.uk/oauth2/aus9rznmmbdD0a4zB5d7/v1/token",
    //     registration_endpoint:
    //       "https://www.patholar.co.uk/oauth2/aus9nb5v06MbLCO115d7/v1/clients",
    //     introspection_endpoint:
    //       "https://sof.patholar.co.uk/oauth2/aus9rznmmbdD0a4zB5d7/v1/introspect",
    //     jwks_uri:
    //       "https://sof.patholar.co.uk/oauth2/aus9rznmmbdD0a4zB5d7/v1/keys",
    //  }
  } catch (err) {
    return Response.errorMessage(res, `Failed!`, httpStatus.NOT_FOUND);
  }
};

import httpStatus from "http-status";
import axios from "axios";
import FhirRequest from "../utils/HttpRequest";
import Response from "../utils/Response";

// import .wellknown
import wellknown from "../smart_urls.json";
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
    // console.log(req.method);
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

export const callFhirApiMetadata = async (req, res) => {
  try {
    const response = await FhirRequest.get(`metadata`);

    const security = {
      extension: [
        {
          extension: [
            {
              valueUri:
                "https://sof.patholar.co.uk/oauth2/aus9rznmmbdD0a4zB5d7/v1/token",
              url: "token",
            },
            {
              valueUri:
                "https://sof.patholar.co.uk/oauth2/aus9rznmmbdD0a4zB5d7/v1/revoke",
              url: "revoke",
            },
            {
              valueUri:
                "https://sof.patholar.co.uk/oauth2/aus9rznmmbdD0a4zB5d7/smart/v1/authorize",
              url: "authorize",
            },
            // {
            //   valueUri:
            //     "https://sof.patholar.co.uk/oauth2/aus9rznmmbdD0a4zB5d7/smart/v1/my-authorizations",
            //   url: "manage",
            // },
            {
              valueUri:
                "https://sof.patholar.co.uk/oauth2/aus9rznmmbdD0a4zB5d7/v1/introspect",
              url: "introspect",
            },
          ],
          url: "http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris",
        },
      ],
      cors: true,
      service: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/restful-security-service",
              code: "SMART-on-FHIR",
            },
          ],
          text: "OAuth2 using SMART-on-FHIR profile (see http://docs.smarthealthit.org/).",
        },
      ],
      description: "OAuth2 plus SMART extensions",
    };

    response.data.rest[0].security = security;

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
    // const response = await axios.get(
    //   "https://auth.patholar.co.uk/sof/.well-known/smart-configuration"
    // );
    // delete response.data.registration_endpoint;
    return res.status(200).json(wellknown);
  } catch (err) {
    return Response.errorMessage(res, `Failed!`, httpStatus.NOT_FOUND);
  }
};

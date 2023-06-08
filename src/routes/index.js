import express from "express";
import { Router } from "express";
import {
  callFhirApi,
  callWellKnown,
  welcomeFhir,
  callFhirApiById,callFhirApiMetadata
} from "../controller/fetchController";
import { verifyUserToken } from "../middleware/verifyToken";
import { verifyPatientAccess } from "../middleware/accessRight";
const route = Router();

route.get("/", welcomeFhir);
route.get("/metadata", callFhirApiMetadata);
route.get("/.well-known/smart-configuration", callWellKnown);
route.get(
  "/:path",
      verifyUserToken,
    verifyPatientAccess,
  callFhirApi
);

route.get(
  "/:path/:id",
      verifyUserToken,
    // verifyPatientAccess,
  callFhirApiById
);

export default route;

import express from "express";
import { Router } from "express";
import { callFhirApi, callWellKnown } from "../controller/fetchController";
import { verifyUserToken } from "../middleware/verifyToken";
import { verifyPatientAccess } from "../middleware/accessRight";
const route = Router();

route.get("/.well-known/smart-configuration", callWellKnown);
route.get("/:path", verifyUserToken, verifyPatientAccess, callFhirApi);

export default route;

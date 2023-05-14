import express from "express";
import { Router } from "express";
import { callFhirApi } from "../controller/fetchController";
import { verifyUserToken } from "../middleware/verifyToken";
import { verifyPatientAccess } from "../middleware/accessRight";
const route = Router();

route.get("/:path", verifyUserToken, verifyPatientAccess, callFhirApi);

export default route;

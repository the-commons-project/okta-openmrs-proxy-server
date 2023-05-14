import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Response from "./utils/Response";
import cors from "cors";
import routes from "./routes/index";
import Status from "http-status";
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/openmrs/ws/fhir2/R4", routes);

app.use((req, res, next) => {
  // const error= new Error("Not Found ! Something Went Wrong ")
  return Response.errorMessage(
    res,
    "Not Found ! Something Went Wrong!",
    Status.NOT_FOUND
  );
});
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 9090;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;

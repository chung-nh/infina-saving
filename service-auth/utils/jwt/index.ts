// import { SECURE_SECRET } from "./../config";
// import jwt from "jsonwebtoken";
import axios from "axios";
import { API_AUTH } from "./../config";

export const getBearerToken = ({ headers }) => {
  const Authorization = headers.Authorization;
  const XAuthorization = headers["X-Authorization"];
  if (!Authorization && !XAuthorization) {
    throw new Error("No authorization");
  }
  return (Authorization || XAuthorization).split(" ")[1];
};

export const verifyJWT = token => {

  // return jwt.verify(token, SECURE_SECRET);
  const query = `query { verifyToken(token: "${token}"){ id email iat exp } }`;
  const variables = {};

  return axios({
    method: "post",
    url: `${API_AUTH.ENDPOINT}`,
    data: {
      query,
      variables,
    },
    headers: {
      "content-type": "application/json"
    },
  }).then(result =>{
      return result?.data;
    });
};

export const verifyJWTFromRequest = req => {
  const token = getBearerToken(req);
  return verifyJWT(token);
};
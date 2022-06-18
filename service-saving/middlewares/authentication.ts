import { verifyJWTFromRequest } from "utils/jwt";
import { AuthenticationError } from "apollo-server-lambda";

const authenticationMiddleware = async ({ event }) => {
  try {
    if (
      event.body
      && !event.body.includes("login")
      && !event.body.includes("signup")
      && !event.body.includes("verifyToken")
      && !event.body.includes("logout")) {
      const data = await verifyJWTFromRequest(event);
      return { id: (data && data.data && data.data.verifyToken) ? data.data.verifyToken.id : "" };
    }
  } catch (err) {
    throw new AuthenticationError(err.message);
  }
};


export default authenticationMiddleware;

import { verifyJWTFromRequest } from "utils/jwt";
import { AuthenticationError } from "apollo-server-lambda";

const authenticationMiddleware = async ({ event }) => {
  try {
    if (
      event.body
    ) {
      const data = await verifyJWTFromRequest(event);
      console.log('data', data);
      if (data && data.data && !data.data.verifyToke) {
        return { id: (data && data.data && data.data.verifyToken) ? data.data.verifyToken.id : "" };
      } else {
        throw new AuthenticationError("UnAuthentication");
      }
    }
  } catch (err) {
    throw new AuthenticationError(err.message);
  }
};

export default authenticationMiddleware;

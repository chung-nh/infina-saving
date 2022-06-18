import { ApolloError, ValidationError } from "apollo-server-lambda";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pg } from "utils/database";
import { SECURE_SECRET } from "./../../../utils/config";
const resolver = {
  Query: {
    login: async (_: null, { email, password }: { email: string, password: string }) => {
      try {
        const user = await pg('users').select('id', 'email', 'password').where({ email: email });

        if (user && user[0]) {
          const valid = await bcrypt.compare(password, user[0].password);
          if (valid) {
            const token = jwt.sign({
              id: 2,
              email: user[0].email
            }, SECURE_SECRET, { expiresIn: '1h' });
            return { result: token };
          }
        }
        throw new ValidationError('Email or password is incorrect.');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    logout: async (_: null, { token }: { token: string }) => {
      try {
        return { result: "Success" };
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    verifyToken: async (_: null, { token }: { token: string }) => {
      try {
        let tokenResult = jwt.verify(token, SECURE_SECRET);
        console.log('tokenResult', tokenResult);
        return tokenResult;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  Mutation: {
    signup: async (_: null, { email, password }: { email: string, password: string }) => {
      try {
        const user = await pg('users').select('id', 'email', 'password').where({ email: email });
        const hash = await bcrypt.hash(password, 8);
        const newUser = { email: email, password: hash, created_on: new Date() }
        if (!user || !user[0]) {
          await pg.insert(newUser).into("users");
          return { result: "Success" };
        }
        throw new ValidationError('Another account is using this email.');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};

export default resolver;

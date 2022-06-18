import { ApolloError, UserInputError } from "apollo-server-lambda";
import { pg } from "utils/database";

const resolver = {
  Mutation: {
    deposit: async (_: null, { amount }: { amount: number }, context) => {
      let userId = context.id;
      try {
        // Validate 
        if (amount <= 0) {
          throw new UserInputError('Invalid amount value', {
            argumentName: 'amount'
          });
        }

        const savings = await pg('savings').select('id', 'user_id', 'amount').where({ user_id: userId });

        // transaction
        await pg.transaction(async trx => {
          //exist or not
          if (savings && savings[0]) {
            const savingsDetailRecord = { savings_id: savings[0].id, type: 'deposit', amount: amount, created_on: new Date() }
            await pg.insert(savingsDetailRecord).into("savings_detail").transacting(trx);

            let amountUpdate = parseFloat(savings[0].amount) + amount;
            // update
            await pg('savings')
              .where({ id: savings[0].id })
              .update({
                amount: amountUpdate
              }).transacting(trx)
          } else {
            // insert saving record
            const savingsRecord = { user_id: userId, amount: amount, created_on: new Date() };
            const savingsNew = await pg.insert(savingsRecord).into("savings").returning('id').transacting(trx);

            // insert saving detail record
            const savingsDetailRecord = { savings_id: savingsNew[0].id, type: 'deposit', amount: amount, created_on: new Date() }
            await pg.insert(savingsDetailRecord).into("savings_detail").transacting(trx);
          }
        })
        return { result: "Success" };
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    withdraw: async (_: null, { amount }: { amount: number }, context) => {
      let userId = context.id;
      
      try {
        // Validate 
        if (amount <= 0) {
          throw new UserInputError('Invalid amount value', {
            argumentName: 'amount'
          });
        }

        const savings = await pg('savings').select('id', 'user_id', 'amount').where({ user_id: userId });

        // check balance
        if (!savings || !savings[0] || amount > savings[0].amount) {
          throw new UserInputError('Insufficient balance in the account', {
            argumentName: 'amount'
          });
        }

        // transaction
        await pg.transaction(async trx => {
          //exist or not
          if (savings && savings[0]) {
            const savingsDetailRecord = { savings_id: savings[0].id, type: 'withdraw', amount: amount, created_on: new Date() }
            await pg.insert(savingsDetailRecord).into("savings_detail").transacting(trx);

            let amountUpdate = parseFloat(savings[0].amount) - amount;
            // update
            await pg('savings')
              .where({ id: savings[0].id })
              .update({
                amount: amountUpdate
              }).transacting(trx);
          }
        })

        return { result: "Success" };

      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};

export default resolver;
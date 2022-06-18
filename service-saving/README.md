# infina-saving
infina.vn saving project

## Setup and run at Local

- Install serverless `npm i -g serverless`
- Login to serverless dashboard `sls login` (optional)
- Run `npm i`
- Run `npm start` - start the serverless at local
- Run `sls invoke local -f {functionName}` - to run a specific function at local (Ref: https://www.serverless.com/framework/docs/providers/google/cli-reference/invoke-local/)

## Deploy to Dev
- Run `sls deploy --stage dev` - to deploy a CloudFormation stack
- Run `sls deploy --stage dev-{your-name}` - to deploy a CloudFormation stack within your name

## Deploy to Prod

- Run `sls deploy --stage prod` - to deploy a CloudFormation stack within your name
## Architecture

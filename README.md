## infina-saving
infina.vn saving mini project

## Architecture
![Architecture](./Saving%20Project%20Architecture.drawio.png?raw=true "Architecture")

## Folder structure
- postman: API data example.
- service-auth: source code auth service and postgres database.
- service-saving: source code savings service.
- cron: source code cronjob daily to calculate savings interest.

# Stack:
- Nodejs + GraphQL + TypeScript + PostgresQL
- Docker
- Postman

## Note:
- Issue:  "Savings interest is calculated DAILY at 23:59:00 and added up to Saving’s balance." => ![Let me know if you have any questions.
]
- Because of the time limit, this project was not include: database migration, some perfomance(noted by a comment in source code), code check, unit test, automation test, production environment setup guide.

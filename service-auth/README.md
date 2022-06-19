## Auth service:

# Run at local:
docker-compose up

endpoint: http://localhost:9998/dev/graphql

# database script:
./service-auth/script/table.sql

Databases: 
- auth_database, savings_database
- username: admin, password: admin, 123

See more detail at: ./docker-compose.yml, line 12-25.


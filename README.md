# mini-e-commerce

## Deployed to heroku. 

### <a href='https://mysterious-oasis-07778.herokuapp.com/api-docs'>Try the API documentation here!</a>

### Steps to run it on local:
- install nodejs
- install docker
- pull/download this repository
- configure env variable in .env.example file
- run command "npm install"
- run command "npx sequelize-cli db:create"
- run command "npx sequelize-cli db:migrate"
- run command "docker pull postgres"
- run command "docker compose up -d"
- open localhost:3000 (default run on port 3000)
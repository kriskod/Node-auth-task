# Node-auth-task
---
## Movie API 
API is using OMDB API to get choosen movies information by GET /movies/:title request.
API is not hosted and it runs on localhost.

### Description
There are 2 mock users - basic, premium. Without login it is possible to get all movies from database, also get movie from OMDb API. </br>
To post a movie user has to be logged in. Verification due to jwt says which user is logged in and what role he has.</br>
If premium user can upload unlimited movies, if basic user should upload only 5 movies a month - still in development.

### Technologies
`cookie-parser`
`morgan`
`mongoose`
`jsonwebtoken`

### Run
npm start </br>
docker-compose up

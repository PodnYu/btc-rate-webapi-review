## Web API using koa and jwt!
`mkdir -p ./api/db/users`
`npm install`
`npm run start`
### routes:
#### POST /user/create
#### input: {
#### &nbsp;&nbsp;&nbsp;&nbsp;login, 
#### &nbsp;&nbsp;&nbsp;&nbsp;password
#### }
#### output: {
#### &nbsp;&nbsp;&nbsp;&nbsp;token
#### }
#### POST /user/login
#### input: {
#### &nbsp;&nbsp;&nbsp;&nbsp;login,
#### &nbsp;&nbsp;&nbsp;&nbsp;password
#### }
#### output: {
#### &nbsp;&nbsp;&nbsp;&nbsp;token
#### }
#### GET /btcRate
#### headers: {
#### &nbsp;&nbsp;&nbsp;&nbsp;Authorization: Bearer \<jwtToken\>
#### }
#### output: {
#### &nbsp;&nbsp;&nbsp;&nbsp;sell,
#### &nbsp;&nbsp;&nbsp;&nbsp;buy
#### }
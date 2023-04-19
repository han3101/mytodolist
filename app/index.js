const {Client} = require('pg')

const client = new Client({
    user: "postgres",
    password: "password",
    host: "chinzonghan.local",
    port: 5432,
    database: "postgres"
})

client.connect()
.then(() => console.log("Connected successfully"))
.then(() => client.query("select * from employees limit 10"))
.then(results => console.table(results.rows))
.catch(e => console.log(`error: ${e}`))
.finally(() => client.end())


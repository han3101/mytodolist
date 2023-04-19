const {Client} = require('pg')

const client = new Client({
    user: "postgres",
    password: "password",
    host: "chinzonghan.local",
    port: 5432,
    database: "postgres"
})

// .then method
client.connect()
.then(() => console.log("Connected successfully"))
// .then(() => client.query("insert into employees values ($1, $2)", [1000, "test"]))
.then(() => Promise.all(names.map((n, index) => client.query("insert into employees values ($1, $2)", [index, n]))))
// .then(() => client.query("delete from employees"))
.then(() => client.query("select * from employees limit 10"))
.then(results => console.table(results.rows))
.catch(e => console.log(`error: ${e}`))
.finally(() => client.end())

// Async method
// execute()

// async function execute() {
//     try {
//         await client.connect()
//         await client.query("BEGIN")
//         for (let i = 2; i < names.length+2; i++) {
//             await client.query("insert into employees values ($1, $2)", [i, names[i-2]])
//         }
//         await client.query("COMMIT")
//     }
//     catch (e){
//         console.log(`error: ${e}`)
//         await client.query("ROLLBACK")
//     }
//     finally {
//         await client.end()
//         console.log("Connection ended successfully.")
//     }
    

// }

let names = ["John", "Lincoln", "Bob", "Alice", "Mallory", "Eve"]


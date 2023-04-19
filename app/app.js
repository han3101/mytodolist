const express = require("express")
const {Client} = require("pg")

const app = express()
app.use(express.json())
const client = new Client({
    "user": "postgres",
    "password": "password",
    "host": "chinzonghan.local",
    "port": 5432,
    "database": "postgres"
})

// start()
async function start() {
    await connect()
    const todos = await readTodos()
    console.log(todos)

    const successCreate = await createTodo("Go to trader joes")
    console.log(`Creating was ${successCreate}`)

    const successDelete = await deleteTodo(1)
    console.log(`Deleting was ${successDelete}`)

    await client.end()
    console.log("Connection ended successfully.")

}

async function connect() {
    try {
        await client.connect()
    }
    catch(err) {
        console.error(`Failed to connect ${e}`)
    }
}

async function readTodos() {
    try {
        const res = await client.query("select id, todo from todolist limit 10")
        return res.rows;
    }
    catch(err) {
        return [];
    }
}

async function createTodo(item) {
    try {
        await client.query("BEGIN")
        await client.query("insert into todolist (todo) values ($1)", [item])
        await client.query("COMMIT")
        return true
    } 
    catch(err) {
        console.log(`error: ${err}`)
        return false
    }
}

async function deleteTodo(id) {
    try {
        await client.query("BEGIN")
        await client.query("delete from todolist where id=($1)", [id])
        await client.query("COMMIT")
        return true
    }
    catch(err) {
        return false
    }
}

connect()

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))

app.get("/todos", async (req,res) => 
{
    const rows = await readTodos();
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(rows))

})

app.post("/todos", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body
        const rows = await createTodo(reqJson.todo)
        result.success = true
    }
    catch(err) {
        result.success = false
    }
    finally {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result))
    }
})

app.delete("/todos", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body
        const rows = await deleteTodo(reqJson.id)
        result.success = true
    }
    catch(err) {
        result.success = false
    }
    finally {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result))
    }
})

app.listen(9999, ()=>console.log("Listening on port 9999."))
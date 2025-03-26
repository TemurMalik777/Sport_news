const express = require('express');
const config = require('config');
const mainRouter = require("./routes/index.routes")
const createTables = require('./config/create-table')
const PORT = config.get("port") || 3030

const app = express()

app.use(express.json())
// app.use((req, res, next) => {
//     console.log("Kelayotgan so‘rov turi:", req.method);
//     console.log("Kelayotgan yo‘nalish:", req.originalUrl);
//     console.log("Kelayotgan ma'lumot:", req.body);
//     next();
// });
app.use("/api", mainRouter)

// // YANGI QO‘SHILGAN QISM
// app.get("/", (req, res) => {
//     res.send("Server ishlayapti!");
// });

app.get("/create-tables", async (req, res) =>{
    await createTables();
    console.log("Tables were created");
    res.status(200).send("created")
})

async function start() {
    try {
        app.listen(PORT, ()=>{
            console.log(`Server started at: http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()

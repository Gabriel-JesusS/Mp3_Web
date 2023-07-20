const { json } = require("body-parser");
const express = require("express");
const { join } = require("path");

const app = express();
const PORT = 3030;

app.use(express.static(join("src")))

app.use(express.json());


app.get("/",(req,res)=>{
  

})

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "/src/index.html"))
})

app.get("/teste.json",(req,res)=>{
  res.send()
})

app.listen(PORT, () => console.log("Rodando na porta:" + PORT))
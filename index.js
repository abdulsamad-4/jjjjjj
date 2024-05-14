import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 5000;
const API_URL = "https://v2.jokeapi.dev/joke/Any"
const API_URI = "https://v2.jokeapi.dev/joke/"

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

/* app.get("/", async (req, res) => {
    try{
        const result = await axios.get(API_URL);
        res.render("index.ejs", {content: JSON.stringify(result.data)})
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
}) */

app.get("/", async (req, res) => {
    try{
        const result = await axios.get(API_URL);
        res.render("index.ejs", {
            category: result.data.category,
            knock: result.data.setup,
            answer: result.data.delivery,
            single: result.data.joke
        })
    } catch (error) {
        res.render("index.ejs", {content: JSON.stringify(error.response.data)})
    }
})

/* app.post("/get-joke", async (req, res) => {
    try{
        const result = await axios.get(API_URL);
        res.render("index.ejs", {
            category: result.data.category,
            knock: result.data.setup,
            answer: result.data.delivery,
            single: result.data.joke
        })
    } catch (error) {
        res.render("index.ejs", {content: JSON.stringify(error.response.data)})
    }
}) */

app.post("/get-joke", async (req, res) => {
    const body = req.body.category
    try{
        const result = await axios.get(API_URI + body);
        res.render("index.ejs", {
            category: result.data.category,
            knock: result.data.setup,
            answer: result.data.delivery,
            single: result.data.joke
        })
    } catch (error) {
        res.render("index.ejs", {content: JSON.stringify(error.response.data)})
    }
})

app.listen(port, () =>{
    console.log(`Server is live at port ${port}`)
})
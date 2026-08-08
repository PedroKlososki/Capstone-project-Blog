import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var data = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/blog", (req, res) => {
    res.render("blog.ejs", { data: data });
    console.log(data);
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/create/submit", (req, res) => {
    
    const dataCreated = req.body;
    dataCreated.id = Math.random();
    data.push(dataCreated);
    console.log(data);

    res.render("blog.ejs", { data: data });
});

app.post("/create/edit", (req, res) => {
    const thisID = req.body["id"];
    var thisIndex;
    var editMode;
    var editData = {};
    data.forEach((element) => {
        if (thisID == element["id"]){
            thisIndex = data.indexOf(element);
            editMode = true;
        }
    });
    editData.id = (thisID);
    editData.index = (thisIndex);
    editData.mode = (editMode);
    console.log(editData);

    res.render("create.ejs", { 
        data: data,
        editMode: editData
    });
});

app.post("/create/edit/submit", (req, res) => {
    const newName = req.body["name"];
    const newContent = req.body["text"];
    console.log(newName);
    console.log(newContent);
    console.log(req.body);
    data.forEach((element) => {
        if (element["id"] == req.body["id"]) {
            var indexToEdit = data.indexOf(element);
            data[indexToEdit]["name"] = newName;
            data[indexToEdit]["text"] = newContent;
        }
    });
    
    res.redirect("/blog");
});

app.post("/create/delete", (req, res) => {
    console.log(req.body);
    data.forEach((element) => {
        if (element["id"] == req.body["id"]) {
            var indexToDelete = data.indexOf(element);
            data.splice(indexToDelete, 1);
        }
    });
    res.redirect("/blog");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
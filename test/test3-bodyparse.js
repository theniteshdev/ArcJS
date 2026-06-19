import Arc from "../src/index.mjs";

const app = Arc();

app.post("/send", app.bodyParse(), (req, res) => {
    res.status(201).json({
        "message": "data successfully uploaded to server!",
        ...req.body
    });
    // bodyParse middleware working fine!
});

app.listen();
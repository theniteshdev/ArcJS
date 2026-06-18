import Arc from "../src/index.mjs";

const app = Arc();

app.get("/", (req, res) => {
    // test 1
    // res.send("Test 1 🤓");

    // test 2
    // res.send(true);

    // test 3
    // res.send(404)

    // test 4
    // res.send({
    //     "message": "test 4 passed",
    //     "success": true
    // })

    // test 5
    res.send([
        {
            "message": "test 5 passed",
            "success": true
        },
        {
            "message": "test 6 passed",
            "success": true
        },
        {
            "message": "test 7 passed",
            "success": true
        },
    ])
});

app.get("/t2", (req, res) => {

    // test 6
    // res.json({
    //     "message": "ok"
    // })
    // test 7
    // res.status(203).json("apple")

    res.status(400).json({
        "username": "test8",
        "password": "working fine"
    })
})

app.get("/t3", (req, res) => {
    // res.set({
    //     "Content-Type": "application/json;charset=utf8",
    //     "Set-Cookie": "uid=45r4"
    // });
    // res.set("apple", "mango")
    res.set("Set-Cookie", [
        "name=nitesh", "age=2", "uid=4r4f"
    ]);
    res.send({
        "message": "hmm, working fine!"
    })
})


app.post("/", (req, res) => {
    res.status(201).json({
        "message": "Ok"
    })
})
app.listen();
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

app.listen();
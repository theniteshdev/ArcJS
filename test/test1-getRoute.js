import Arc from "../src/index.mjs";


const emojis = ["😀", "🚀", "🎉", "🔥", "💡", "✨", "🤖"];
let testNo = 1;
function logEmojies() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    console.log(`Test ${testNo} passed ${emojis[randomIndex]}`);
    testNo++
}

const app = Arc();
app.get('/',
    (req, res, next) => {
        console.log(`Route: ${req.url}`)
        logEmojies();
        next();
    },
    (req, res, next) => {
        logEmojies();
        next();
    },
    (req, res, next) => {
        logEmojies();
        next();
    },
    (req, res, next) => {
        logEmojies();
        next();
    },
    (req, res, next) => {
        logEmojies();
        next();
    },
    (req, res, next) => {
        logEmojies();
        next();
    },
    (req, res, next) => {
        logEmojies();
        next();
    },
    (req, res) => {
        logEmojies();
        res.end('Final Handler');
    }
);

app.get("/t2", (req, res) => {
    logEmojies();
    res.end("test2 passed")
});
app.listen()
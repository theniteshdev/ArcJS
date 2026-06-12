import http from "node:http";

const registeredRoutes = [];

function Arc() {
    return {
        get(route, ...middlwares) {
            registeredRoutes.push({
                "method": "GET",
                "route": route,
                middlwares: [...middlwares]
            })
        },
        listen(port = 8080, hostname = "localhost", func = (err) => {
            if (err) throw new Error(err?.message || "Something went wrong!");
            console.log(`Server running at port ${port}`)
        }) {
            // start a http server
            const server = http.createServer((req, res) => {
                // adding extra methods to req object
                function sendProper(contentType, msg) {
                    res.setHeader("Content-Type", `${contentType}`);
                    const byteLength = Buffer.byteLength(msg, "utf-8");
                    res.setHeader("Content-Length", byteLength);
                    res.write(msg);
                    res.end();
                }

                res.send = (msg) => {
                    if (Buffer.isBuffer(msg)) sendProper("application/octet-stream");
                    switch (typeof msg) {
                        case "string":
                            sendProper("text/html; charset=utf-8", msg);
                            break;
                        case "object":
                            sendProper("application/json; charset=utf-8", JSON.stringify(msg));
                            break;
                        default:
                            sendProper("application/json; charset=utf-8", JSON.stringify(msg));
                            break;
                    }
                }; // send method ending

                res.json = (body) => {
                    if (typeof (body) !== "object") {
                        try {
                            body = JSON.stringify(body);
                        } catch (error) {
                            throw new Error(error)
                        }
                    };
                    sendProper("application/json; charset=utf-8", body);
                }

                // getting pathname and request method
                const { pathname: reqPath } = new URL(req.url, `http://${req.headers.host}`);
                const reqMethods = req.method.toUpperCase();

                // loop through the registerd routes
                for (const route of registeredRoutes) {
                    if (route.route === reqPath && route.method === reqMethods) {

                        const stack = [...route.middlwares];
                        let index = 0;
                        function next() {
                            if (index < stack.length) {
                                const fn = stack[index];
                                index++;
                                fn(req, res, next)
                            }
                        }
                        next();
                        break;
                    }
                }
            }); // ending of server object

            server.listen(port, hostname, func)

        }
    }
};


export default Arc;
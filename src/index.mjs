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
                            res.setHeader("Content-Type", `application/json`);
                            res.write(JSON.stringify(body));
                            res.end();
                        } catch (error) {
                            throw new Error(error)
                        }
                    };
                    res.setHeader("Content-Type", `application/json`);
                    res.write(JSON.stringify(body));
                    res.end();
                }

                res.status = (code) => {
                    // here i am not using writeHead because if we use write writeHead then its acts like response is done but here we have to provide chain so used 
                    res.statusCode = code;
                    return res;
                }

                res.set = (...headers) => {
                    if (typeof (headers[0]) === "string") {
                        res.setHeader(headers[0], headers[1]);
                        return res;
                    }
                    if (typeof [headers[0]] === "object" && headers[0] !== null && !Array.isArray(headers[0])) {
                        for (const headerName in headers[0]) {
                            res.setHeader(headerName, headers[0][headerName]);
                        }; // looping through object

                    }
                    if (typeof (headers[0]) === "string" && Array.isArray(headers[1])) {
                        for (const values of headers[1]) {
                            res.setHeader(headers[0], values);
                        }
                    }
                    return res;
                }

                // getting pathname and request method
                const { pathname: reqPath } = new URL(req.url, `http://${req.headers.host}`);
                const reqMethods = req.method.toUpperCase();
                req.path = reqPath; // setting path property to the request obj
                // loop through the registerd routes
                for (const route of registeredRoutes) {
                    req.route = route; // setting route propert to the request obj
                    if (route.route === reqPath && route.method === reqMethods) {
                        if (route.route.includes(/:.*/)) {
                            console.log(route.route)
                        }
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
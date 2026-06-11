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
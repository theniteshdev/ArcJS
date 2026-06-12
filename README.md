# ArcJS

ArcJS: A **lightweight**, educational web framework for Node.js built from scratch to demystify how servers work. This project features a **100% dependency-free** architecture to provide a deep, hands-on understanding of the request-response lifecycle.

## Documention

_-nitesh_

### Demo Application

```javascript
import Arc from "./src/index.mjs";

const app = Arc();

application.get(
  "/dashboard",
  (req, res, next) => {
    console.log("Auth Check...");
    next(); // Passes control to the next function
  },
  (req, res) => {
    res.end("Welcome to the secure dashboard!");
  },
);

app.listen(); // automatically listen on port 8080
```

### Routes Function

- `app.get()` handling get method.

ags1- `path`
ags2- `handler`
arg3- `...middlewares`

After passing path you can **register multiple handlers** and they run step by step if next is called by previous handler.

### Listening to the server

- `app.listen()` listen to server by deafult runs on localhost port 8080

### Methods

- `send()` provide a convinent way way to send message or any json data perfectly.
- `json()` sending JSON data with proper headers.
- `status()` using status method, you can set response code, this return the response object So, you can chain this with other methods.
- `set()` can set single or multiple headers

```javascript
// use 'set()' method

// setting single header
res.set("Content-Type", "application/json");

// setting single header with multiple values
res.set("Set-Cookie", [
  "uid=7h4;secure;httpOnly",
  "username=testing;secure;httpOnly",
  "theme=dark",
]);

// setting multiple header
res.set({
  Location: "https://www.google.com",
  foo: "bar",
  "Content-Length": 899,
});
```

-[nitesh](https://x.com/theniteshdev)

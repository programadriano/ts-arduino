import app from "./app";

let port = process.env.PORT || '3000';

app.app.listen(port, function () {
    console.log(`server running in" + ${port}`);
});

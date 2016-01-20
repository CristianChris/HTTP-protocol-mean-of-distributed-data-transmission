var http = require('http');


var data = JSON.stringify(
[
    {   id: "1",
        username: "cartocri",
        password: "haha!"
    },
    {   id: "2",
        username: "vasile",
        password: "dasdasd!"
    },
    {   id: "3",
        username: "ion",
        password: "23432432!"
    }
]);

var options = {
    host: 'localhost',
    port: 8080,
    path: '/post1',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};

var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("body: " + chunk);
    });
});

req.write(data);
req.end();

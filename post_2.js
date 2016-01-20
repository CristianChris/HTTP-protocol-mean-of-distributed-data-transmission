var http = require('http');



var data = JSON.stringify(
[
    {   id: "11",
        username: "macridan",
        password: "143rwscs!"
    },
    {   id: "2x2",
        username: "vadim",
        password: "dfedsfknekf!"
    },
    {   id: "33",
        username: "sveta",
        password: "498tusiujfsfji!"
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

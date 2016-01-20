//Lets require/import the HTTP module
var http = require('http');
var dispatcher = require('httpdispatcher');
var url = require('url');
var _ = require('underscore');

//Lets define a port we want to listen to
const PORT=8080;

// Decalirng the array of object as our data warehouse
data_warehouse = new Array();

//We need a function which handles requests and send response
function handleRequest(request, response){
     try {
        //log the request on console
        //console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
dispatcher.setStatic('resources');

//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // response to confirm the data transmission
    res.end('Got Post Data'+ req.body);
    // Output the data
    console.log('Data received'+ req.body)
    // data_warehouse.push(req.body);
    data_warehouse.push.apply(data_warehouse,JSON.parse(req.body));
});



//GET request /employee with the given ID
dispatcher.onGet("/employee", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    url_parts = url.parse(req.url, true);
    query = url_parts.query;

    // data_warehouse.forEach( function (arrayItem){
    //     var x = arrayItem.id;
    //     if(query.id == x){
    //         res.end(JSON.stringify(arrayItem));
    //     }
    //     // else {
    //     //     res.end('please insert the correct ID')
    //     // }
    // });
    if  (_.isEmpty(query)){
        res.end("Please insert a valid ID")
    } else {
        data_warehouse.forEach( function (arrayItem){
            var x = arrayItem.id;
            if(query.id == x){
                res.end(JSON.stringify(arrayItem));
            }
        });
    }
});

// GET request a list of /employees
dispatcher.onGet("/employees", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    url_parts = url.parse(req.url, true);
    query = url_parts.query;

    if (_.isEmpty(query)) {
        res.end(JSON.stringify(data_warehouse));
    } else {
        data_warehouse.forEach( function (arrayItem){
            if (query.offset && query.limit){
                var test = [];
                for(i=0; i<query.limit; i++){
                    test.push(data_warehouse[query.offset-1+i])
                }
                res.end(JSON.stringify(test));
            } else {
                res.end('please give a correct url query');
            }
        });
    }
});

}



//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

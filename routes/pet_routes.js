var r = require('request') // *
    .defaults({json:true});

var async = require('async');

var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

module.exports = function(app){


    app.get('/pets', function(req,res){

        async
            .parallel({

                cat: function(callback){
                    r({uri:'http://localhost:3000/cat'}, function(err,resp,body){
                        if (err) {
                            callback({service:'cat', error:error});
                            return;
                        }
                        if(!err && resp.statusCode === 200){
                            callback(null, body.data);
                        } else {
                            callback(resp.statusCode);
                        }
                    });
                },
                dog: function(callback){
                    client.get('http://localhost:3001/dog', function(err,dog){
                        if(err) {throw error;}
                        if (dog) {
                            callback(null, JSON.parse(dog));
                        } else {
                            r({uri:'http://localhost:3001/dog'}, function(err,resp,body){
                                if (err) {
                                    callback({service:'dog', error:error});return;
                                }
                                if(!err && resp.statusCode === 200){
                                    callback(null, body.data);
                                    client.setex('http://localhost:3001/dog', 10, JSON.stringify(body.data), function(err){
                                        if (err) {throw error;}
                                    });
                                } else {
                                    callback(resp.statusCode);
                                }
                            });
                        }
                    });

                }

            },
            function(error, results){
                res.json({error: error, results: results});
            });

    });

    app.get('/ping', function(req,res){
        res.json({pong: Date.now()});
    });


};

// * github.com/request/request
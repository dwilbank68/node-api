var _ = require('lodash');
var Cat = require('../models/cat_model.js');

module.exports = function(app){


    app.post('/cat', function(req,res){
        var newCat = new Cat(req.body);
        newCat.save(function(err){
            if (err) { res.json({info:'error during cat create', error:err}) };
        });
        res.json({info: 'cat created'});
    });




    app.get('/cat', function(req,res){
        Cat.find(function(err,cats){
            if (err) { res.json({info:'error during find cats', error:err}) }
            res.json({info: 'cats found', data:cats});
        });
    });



    app.get('/cat/:id', function(req,res){
        Cat.findById(req.params.id, function(err,cat){
            if (err) { res.json({info:'error during find cat', error:err}) }
            if (cat){
                res.json({info: 'cat found', data:cat});
            } else {
                res.json({info: 'cat not found'});
            }
        });
    });




    app.put('/cat/:id', function(req,res){
        Cat.findById( req.params.id, function(err,cat){
            if (err) { res.json({info:'error during find cat', error:err }) }
            if (cat) {
                _.merge(cat, req.body);
                cat.save(function(err){
                    if(err){res.json({info:'error during update cat', error:err })}
                    res.json({info: 'cat updated'});
                });
            } else {
                res.json({info:'cat not found'});
            }
        });

    });







    app.delete('/cat/:id', function(req,res){
        Cat.findByIdAndRemove(req.params.id, function(err){
            if(err){res.json({info:'error during delete cat', error:err })}
        });
        res.json({info: 'cat removed'});
    });


};
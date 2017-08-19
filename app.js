// npm install mongoose@4.10.8 bluebird --save
const mongoose = require('mongoose');
const recipeModel = require('./models/recipe')
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/test');

let name = 'Pancakes1'
const recipe = new recipeModel.Recipe({name: name, source: "Grandma"});
recipe.save()
  .then(function () {
    console.log('saved ' + name);
    return recipeModel.Recipe.findOne({name: "Pancakes"})
  }).then(function(results) {
    console.log('findOne returned ' + results);
    return recipeModel.Recipe.find({cookTime: {$gt: 15, $lt: 60}})
  }).then(function (results) {
    console.log('find returned ' + results.length + ' results');
  }).catch(function (error) {
    console.log('error ' + JSON.stringify(error));
  })

process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});

const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    const newRecipe = new Recipe({
      title: "Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs",
      ],
      cuisine: "US",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu",
    });

    newRecipe.save((err, res) => {
      if (err) return console.log(err);
      else return console.log("Result: ", res);
    });
  })
  .then(() => {
    return Recipe.create(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
  })
  .then(() => {
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then(() => {
    mongoose.connection.close(() => {
      console.log("connection closed");
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

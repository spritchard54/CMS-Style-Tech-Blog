// Dependencies
const express = require('express');
// Import express-handlebars - 3rd party middleware
const exphbs = require('express-handlebars');
const hbs = exphbs.create({}); // setting up the engine
const path = require('path');


// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Describe what the following two lines of code are doing.
// The following two lines of code are setting Handlebars.js as the default template engine.
app.engine('handlebars', hbs.engine); // using the render engine
app.set('view engine', 'handlebars'); // connect render to handlebars

// --- after this line, you can import routes and use res.render ---

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/dish-routes'));

  

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
  });

const router = require('express').Router();
// GET route for getting all of the dishes that are on the menu
router.get('/', async (req, res) => { 
  // This method is rendering the 'homepage' Handlebars.js template. This is how we connect each route to the correct template.
  res.render('homepage');
});

router.get('/dashboard', async (req, res) => { 
  res.render('dashboard', //name of the handlebars file
    {
      layout: 'dashboard-category' // from the layouts folder
  });
});

module.exports = router;

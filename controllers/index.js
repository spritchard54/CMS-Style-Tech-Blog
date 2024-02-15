const router = require("express").Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');


router.use('/', homeRoutes);
//example http://localhost:3001/

router.use('/api', apiRoutes);
//example http://locahost:3001/api
//example http://locahost:3001/api/comments
//example http://locahost:3001/api/posts
//example http://locahost:3001/api/users

// the dashboardsRoutes.js file is required in as a value of the dashboardRoutes const variable above
// if '/dashboard' appears in the browser url the function(?) below tells the app to look at the "./dashboardRoutes" file for the request logic
router.use('/dashboard', dashboardRoutes);
//example http://locahost:3001/dashboard

module.exports = router;

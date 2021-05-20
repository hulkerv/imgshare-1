 require('dotenv').config();

// SERVER CONFIG
const app = require('./config');

// DATABASE
require('./database');

// STARTING SERVER

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
});
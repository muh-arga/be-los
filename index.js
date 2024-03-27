const app = require('./src/express');

require('dotenv').config();

const port = process.env.PORT || 5000;

async function init() {
    console.log('Starting server...');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://127.0.0.1:${port}`);
    });
}

init()
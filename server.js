require('module-alias/register');
require('dotenv').config();
const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`i'm listening on port: ${process.env.PORT}`);
});

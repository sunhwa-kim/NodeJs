const app = require('../index');
const syncDB = require('./sync-db');

const port = 3000;

syncDB().then(_=> {
  console.log('Sync DB');
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})



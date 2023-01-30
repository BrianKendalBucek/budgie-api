const db = require('../connection');
//#FrontendFreshmen

//query to grab all expenses associated with a dude
const getAllexpendituresById = (id) => {
  return db.query(`
    SELECT * FROM expenditures;
  `)
    .then(data => {
      return data.rows;
    });
  };
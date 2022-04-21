const Pool = require('pg').Pool
const pool = new Pool({
  user: 'austinchapin',
  host: 'localhost',
  database: 'test',
  port: 5432
})

module.exports = {

  testQuery: (req, res) => {
    pool.query('SELECT * FROM reviews where id = 5;', (err, results) => {
      if (err) {
        console.log(err)
      }
      console.log('TESTING - No error in pool.query')
      res.json(results.rows[0])
    })
  }
}
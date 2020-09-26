const pool = require('./pool');

const getUsers = (req,res) => {
    pool.query(`SELECT * FROM users ORDER BY id ASC`, (err, results) => {
        if (err) {
            console.error(err);  // custom throw 가능
            return
        }
        res.status(200).json(results.rows)
    })
}
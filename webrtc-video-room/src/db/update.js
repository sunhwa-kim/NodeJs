const pool = require('./pool');

const updateUser = (req, res) => {
    const { id } = parseInt(req.body)
    const { name, email } = req.body

    pool.query(`UPDATE users SET name = $1, email = $2 WHERE id = $3`,
    [name, email,id], (err,results) => {
        if (err){
            console.error(err);
            return
        }
        res.status(200).send('User was updated');
    })
}

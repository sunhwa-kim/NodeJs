// conditional select

const pool = require('./pool');

const condSelect = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(`SELECE * FROM users WHERE id = $1`, [id],(err, results)=>{
        if(err){
            console.error(err)
            return
        }
        res.status(200).json(results.rows);
    })
}
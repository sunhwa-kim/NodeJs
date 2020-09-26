const pool = require('./pool');

const deleteUser = (req,res) => {
    const id = parseInt(req,params.id);

    pool.query(`DELETE FROM users WHERE id = $1`,[id], (err, results)=>{
        if(error){
            console.error(error);
            return
        }
        res.status(200).send('User was deleted');
    })
}
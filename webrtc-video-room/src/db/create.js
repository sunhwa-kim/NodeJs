const pool = require('./pool');

const createUser = (req, res) => {
    const {name, email } = req.body

    pool.query(`INSERT INTO users (name, email) VALUES ($1, $2)`,[name, email], (error, results)=>{
        if(error){
            // throw error
            console.error(error)  // return으로 종료 시켜야 아래 res 진행 안되게 
            return
        }
        res.status(200).send(`New user added`);
    });
}
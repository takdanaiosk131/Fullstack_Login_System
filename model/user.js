module.exports = {
     addUser: async (pool,user) => {
        const sql = `INSERT INTO users (
            email, password,facebook_user_id,facebook_email
        ) VALUES (
            ?, ? , ? , ?
        )`
        const result = await pool.query(sql,[user.username,user.password,user.facebook_id,user.facebook_email])
        // console.log(result);
        return result[0].insertId;
    },
    getPasswordByEmail: async (pool,user) =>{
        const sql = `SELECT password FROM users WHERE email = ?`
        const result = await pool.query(sql,[user])
        return result[0]
    },
    getIdByEmail: async (pool,user) => {
        const sql = `SELECT id FROM users WHERE email = ?`
        const result = await pool.query(sql,[user])
        return result[0]
    }

}
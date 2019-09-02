const bcrypt = require('bcrypt')
module.exports = function(pool,userModel){
    return {
        validateInput: async (ctx,next) => {
            const { email, password } = ctx.request.body
            if(!email){
                ctx.status = 400
                ctx.body = {"error": "email already used"}
                return
            }

            const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/
            if (!emailRegex.test(email)) {
              ctx.status = 400
              ctx.body = { error: 'invalid email'}
              return
            }

            if(password.length < 6){
                ctx.status = 400
                ctx.body = {"error": "password too short"}
                return
            }

            await next();
        },
        signUp: async (ctx) => {
            const { email, password } = ctx.request.body
            const hashPassword = await bcrypt.hash(password,10)
            const user = {
                username : email,
                password : hashPassword
            }
            const result = await userModel.addUser(pool,user)
            // console.log(result)
            ctx.body = { userId: result }
        },
        signIn: async (ctx) => {
            const {email,password} = ctx.request.body
            const chk = await userModel.getPasswordByEmail(pool,email)
            // console.log(password)
            // console.log(chk)
            if(!chk[0]){
                ctx.status = 400
                ctx.body = {
                    "error": "wrong email or password"
                }
                return
            }

            const same = await bcrypt.compare(password,chk[0].password)
            if(!same){
                ctx.status = 400
                ctx.body = {
                    "error": "wrong email or password"
                }
                return
            }
            objUserId = await userModel.getIdByEmail(pool,email)
            ctx.session.userId = objUserId[0].id
            ctx.body = { userId: ctx.session.userId }
        },
        signOut: async (ctx) => {
            ctx.session = null
            ctx.status = 200
            ctx.body = {}
        }
    }
}
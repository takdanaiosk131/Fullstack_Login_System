const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const koaBody = require('koa-body');
const mysql2 = require('mysql2/promise');
const session = require('koa-session')
const cors = require('@koa/cors')


const app = new Koa();
const router = new Router();


const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'pikkanode',
});

const sessionStore = {}
const sessionConfig = {
    key: 'sess',
    maxAge: 1000 * 60 * 60,
    httpOnly: false,
    store: {
        get (key, maxAge, { rolling }) {
          return sessionStore[key]
        },
        set (key, sess, maxAge, { rolling }) {
          sessionStore[key] = sess
        },
        destroy (key) {
          delete sessionStore[key]
        }
    }
     
}

const userModel = require('./model/user')
const userController = require('./controller/user')
const apiUser = userController(pool,userModel)

router.get('/', ctx => {
    ctx.body = "Hello"
})
router.post('/api/signup',apiUser.validateInput,apiUser.signUp)
router.post('/api/signin',apiUser.signIn)
router.post('/api/signout',apiUser.signOut)

app.keys = ['supersecret']
app.use(session(sessionConfig,app))
app.use(serve(path.join(__dirname,'public')))
app.use(koaBody({ multipart: true }))
app.use(cors({
  origin: 'http://localhost:3000',
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Authorization', 'Content-Type'],
  maxAge: 5,
  credentials: 'true'
 }))
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3001);
const WebFramework = require('../../dist/web-framework.umd')

const app = new WebFramework.Application()
const router = new WebFramework.Router()

app.use(router)

router.get('/', (req, res) => {
  res.end('Hello')
})

app.listen(3000, () => console.log('Server start'))

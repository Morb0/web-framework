const WebFramework = require('../../dist/web-framework.umd')

const app = new WebFramework.Application()
const router = new WebFramework.Router('/hello')

app.use(router)

router.get('/world', (req, res) => {
  res.end('[GET] Hello')
})

router.post('/world', (req, res) => {
  res.end('[POST] Hello')
})

app.listen(3000, () => console.log('Server start'))

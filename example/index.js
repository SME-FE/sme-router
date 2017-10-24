import './main.scss'
import SMERouter from '../src/index'
import spring from './pages/spring'
import { summer, morn, nightfall } from './pages/summer'
import autumn from './pages/autumn'
import winter from './pages/winter'

let router = null
if (process.env.NODE_ENV === 'gh') {
  router = new SMERouter('router-view')
} else {
  router = new SMERouter('router-view', 'html5')
}

// route config
router.route('/spring/:year', spring)
router.route('/summer/:year', summer)
router.route('/summer/:year/morn', morn)
router.route('/summer/:year/nightfall', nightfall)
router.route('/autumn/:year', autumn)
router.route('/winter/:year', winter)

// redirect example
router.route('*', (req, res, next) => {
  res.redirect('/spring/1945?month=10&day=24')
})

// middleware example
router.use((req) => {
  if (!req.body) req.body = {}
  req.body.parsedByMiddleware = `${req.params.year}-${req.query.month}-${req.query.day}`
})

// middleware example 2
router.use((req) => {
  if (req.body && req.body.mes) {
    req.body.mes += ' ~~'
  }
})

window.router = router

/**
 * 移动端适配
 */
const menuBar = document.querySelector('.menu-bar')
const menuList = document.querySelector('.menu-list')

menuBar.addEventListener('click', () => {
  let temp = menuList.style.display
  menuList.style.display = temp === 'none' ? 'block' : 'none'
})

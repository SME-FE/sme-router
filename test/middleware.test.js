/**
 * 测试中间件
 */

import SMERouter from '@/index'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'chai-sinon'
chai.should()
chai.use(sinonChai)

describe('sme-router middlewares test', function () {
  // const info = console.info
  const mountPoint = '<div id="route-view"></div>'

  document.body.insertAdjacentHTML(
    'afterbegin',
    mountPoint
  )

  afterEach('reset hash', () => {
    window.location.hash = ''
    sessionStorage.clear()
  })

  // #region
  it('middlewares should be called in order', done => {
    let router = new SMERouter('route-view')

    router.use((req) => {
      req.query.count = parseInt(req.query.count) + 3
    })

    router.use((req) => {
      req.query.count *= 6
    })

    router.route('/index', (req, res, next) => {
      let result = req.query.count
      result.should.be.equal(24)
      router.stop()
      done()
    })
    router.go('/index?count=1')
  })

  it('if redirect, middlewares should not be called', done => {
    let router = new SMERouter('route-view')
    let flag = sinon.spy()

    router.use((req) => {
      flag()
      req.route.should.be.not.equal('*')
      req.query.count = parseInt(req.query.count) * 6
    })

    router.route('/index', (req, res, next) => {
      let result = req.query.count
      result.should.be.equal(12)
      flag.should.have.callCount(1)
      router.stop()
      done()
    })

    router.route('*', (req, res, next) => {
      res.redirect('/index?count=2')
    })
    router.go('/test')
  })
  // #endregion
})

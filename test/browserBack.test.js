/**
 * 测试浏览器返回行为
 * note：浏览器刷新页面行为（window.location.reload()）无法在 karma 测试（），
 * 行为也是一样的
 */

import SMERouter from '@/index'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'chai-sinon'
chai.should()
chai.use(sinonChai)

describe('sme-router test browser back', function () {
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
  it('should not lost request.body data after history back', done => {
    let router = new SMERouter('route-view')
    let count = 0
    let indexHandler = sinon.spy()
    const temp = {
      name: 'hwen'
    }

    router.route('/index', (req, res, next) => {
      count++
      indexHandler()
      let body = req.body
      body.should.be.deep.equal(temp)

      if (count === 1) {
        router.go('/other')
      }

      if (count === 2) {
        indexHandler.should.have.callCount(2)
        router.stop()
        done()
      }
    })

    router.route('/other', () => {
      router.back() // same as window.history.go(-1)
    })
    router.go('/index', { name: 'hwen' })
  })

  it('html5 mode should get same result', done => {
    let router = new SMERouter('route-view', 'html5')
    let count = 0
    let indexHandler = sinon.spy()
    const temp = {
      name: 'hwen'
    }

    router.route('/index', (req, res, next) => {
      count++
      indexHandler()
      let body = req.body
      body.should.be.deep.equal(temp)

      if (count === 1) {
        router.go('/other')
      }

      if (count === 2) {
        indexHandler.should.have.callCount(2)
        router.stop()
        done()
      }
    })

    router.route('/other', () => {
      router.back() // same as window.history.go(-1)
    })
    router.go('/index', { name: 'hwen' })
  })

  // #endregion
})

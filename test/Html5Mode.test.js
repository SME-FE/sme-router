/**
 * 同 request.test.js
 * 只是用的是 hmlt5 的模式
 */

import SMERouter from '@/index'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'chai-sinon'
chai.should()
chai.use(sinonChai)

describe('sme-router test in html5 mode should get same result', function () {
  this.timeout(2000)

  const routePath = '/test/:sme'
  // const info = console.info
  const template = '<span>some conent</span>'
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
  it('should be not match any routes', done => {
    let cc = sinon.spy()
    let router = new SMERouter('route-view', 'html5')
    router.route(routePath, cc)

    router.go('/test-other')

    setTimeout(() => {
      cc.should.have.callCount(0)
      router.stop()
      done()
    }, 500)
  })

  it('should match route', done => {
    let router = new SMERouter('route-view', 'html5')
    router.route(routePath, (req, res, next) => {
      res.render(template)

      let content = ''

      content = document.getElementById('route-view').innerHTML
      content.should.equal(template)
      router.stop()
      done()
    })

    router.go('/test/something')
  })
  // #endregion

  // #region
  it('params.sme should be whattt', done => {
    let router = new SMERouter('route-view', 'html5')
    router.route(routePath, (req) => {
      req.params.sme.should.be.equal('whattt')
      router.stop()
      done()
    })

    router.go('/test/whattt')
  })

  it('request=> /test/oook?info=hallo, query.info should be hallo', done => {
    let router = new SMERouter('route-view', 'html5')
    router.route(routePath, (req) => {
      req.query.info.should.be.equal('hallo')
      router.stop()
      done()
    })

    router.go('/test/oook?info=hallo')
  })

  it('request=> /test/whattt, body should be body', done => {
    const body = {
      mes: 'hi',
      name: 'hwen'
    }

    const temp = {
      mes: 'hi',
      name: 'hwen'
    }

    let router = new SMERouter('route-view', 'html5')
    router.route(routePath, (req) => {
      req.body.should.be.deep.equal(temp)
      router.stop()
      done()
    })

    router.go('/test/whattt', body)
  })
  // #endregion
})

/**
 * 测试路由重定向
 */

import SMERouter from '@/index'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'chai-sinon'
chai.should()
chai.use(sinonChai)

describe('sme-router redirect test', function () {
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
  it('path: /other, before and after hook should be called once', done => {
    let preHook = sinon.spy()
    let postHook = sinon.spy()
    let router = new SMERouter('route-view')
    let order = ''

    router.route('/index', () => {
      order += 'index'
      postHook()
      preHook.should.have.callCount(1)
      postHook.should.have.callCount(1)
      order.should.be.equal('*index')
      router.stop()
      done()
    }) 

    router.route('*', (req, res, next) => {
      preHook()
      order += '*'
      res.redirect('/index')
    })
    
    router.go('/other')
  })

  it('path: /index, redirect should not match', done => {
    let preHook = sinon.spy()
    let postHook = sinon.spy()
    let router = new SMERouter('route-view')
    let order = ''

    router.route('/index', () => {
      order += 'index'
      postHook()
      preHook.should.have.callCount(0)
      postHook.should.have.callCount(1)
      order.should.be.equal('index')
      router.stop()
      done()
    }) 

    router.route('*', (req, res, next) => {
      preHook()
      order += '*'
      res.redirect('/index')
    })
    
    router.go('/index')
  })
  // #endregion
})

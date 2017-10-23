/**
 * 测试二级路由
 */

import SMERouter from '@/index'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'chai-sinon'
chai.should()
chai.use(sinonChai)

describe('sme-router sub view test', function () {
  // const info = console.info
  const template = '<span>some conent</span>'
  const template2 = '<span>other conent</span>'
  const templates = [template, template2]
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
  it('should render new content to sub route view', done => {
    let router = new SMERouter('route-view')
    let order = ''

    router.route('/index', (req, res, next) => {
      order += '1'
      next(`
        ${template}
        ${res.subRoute()}
      `)
    })

    router.route('/index/sub', (req, res, next) => {
      order += '2'
      res.render(template2)

      order.should.be.equal('12')
      let subContent = ''
      subContent = document.getElementById('__sub-route-view').innerHTML
      subContent.should.equal(template2)

      let renderedSpans = document.getElementById('route-view').querySelectorAll('span')
      for (let i = 0; i < renderedSpans.length; i++) {
        templates[i].should.be.equal(renderedSpans[i].outerHTML)
      }
      
      router.stop()
      done()
    })
    
    router.go('/index/sub')
  })

  // #endregion
})

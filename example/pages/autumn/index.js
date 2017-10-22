import pugTemplate from './autumn.pug'
import hbsTemplate from './autumn.hbs'
import htmlTemplate from './autumn.html'

export default function autumn (req, res, next) {
  const templateType = req.query.type
  var { params, query, body } = req
  window.params = params

  if (templateType === 'hbs') {
    res.render(hbsTemplate({
      paramsStr: JSON.stringify(params),
      queryStr: JSON.stringify(query),
      bodyStr: JSON.stringify(body),
      body: body
    }))
  } else if (templateType === 'html') {
    // TODO: add a api to parse htmlTemplate
    res.render(htmlTemplate)
  } else {
    res.render(pugTemplate(req))
  }
}

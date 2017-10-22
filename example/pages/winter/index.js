
export default function winter (req, res, next) {
  const { query, params, body } = req
  
  res.render(`
  <div class="content-container">
    <h2 class="content-header">霜</h2>
    <div class="sub-title">
      <div class="route">/winter/:year</div>
      <div class="desc">简单例子，通过 <code>params</code>，<code>query</code>，<code>body</code> 传递参数</div>
    </div>
    <section>
      <div>============================</div>
      <div>params: ${JSON.stringify(params)}</div>
      <div>query: ${JSON.stringify(query)}</div>
      <div>body: ${JSON.stringify(body)}</div>
      <div>============================</div>
    </section>
    <section class='example-box'>
      <div class='example-head'># example</div>
      <div>Current Day: <code>${body.parsedByMiddleware}</code></div>
      <div class='mes'>${body && body.mes ? `${body.mes}` : 'Default Mes: I am hwen 😀'}</div>
    </section>
  </div>
  `)
}


export default function winter (req, res, next) {
  const { query, params, body } = req
  
  res.render(`
  <div class="content-container">
    <h2 class="content-header">霜</h2>
    <div class="sub-title">
      <div class="route">/winter/:year</div>
      <div class="desc">
        <code>sme-router</code> 是轻量的前端路由库，用 express route 的风格实现 🌚
      </div>
    </div>
    <section>
      <div>============================</div>
      <div>params: ${JSON.stringify(params)}</div>
      <div>query: ${JSON.stringify(query)}</div>
      <div>body: ${JSON.stringify(body)}</div>
      <div>============================</div>
    </section>
    <section class='example-box'>
      <div class='example-head'># about</div>
      <div class='mes'> 
        例子源码可以在
        <a href="https://github.com/SME-FE/sme-router/blob/master" traget="_blank">
          Github 仓库
        <a/>
        的 example 文件夹找到。
        <br>
        <code>sme-router</code> 文档地址在 
        <a href="https://github.com/SME-FE/sme-router/blob/master/docs/document.zh.md" traget="_blank">
          这里
        <a/>
      </div>
    </section>
  </div>
  `)
}

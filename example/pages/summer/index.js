import './summer.scss'
import morn from './morn'
import nightfall from './nightfall'

export { morn, nightfall }

export function summer (req, res, next) {
  const { query, params, body } = req
  
  next(`
    <div class="content-container">
      <h2 class="content-header">霞</h2>
      <div class="sub-title">
        <div class="route">/summer/:year，/summer/:year/morn，/summer/:year/nightfall</div>
        <div class="desc">二级路由演示，点击 <code>朝</code> 或 <code>夕</code> ，注意 url 变化 😛</div>
      </div>
      <section>
        <div>============================</div>
        <div>params: ${JSON.stringify(params)}</div>
        <div>query: ${JSON.stringify(query)}</div>
        <div>body: ${JSON.stringify(body)}</div>
        <div>============================</div>
      </section>
      <div class='sub-route-list'>
        <span id='morn' onclick="router.go('/summer/1914/morn?month=07&day=30&some=morn')">朝</span>
        <span id='nightfall' onclick="router.go('/summer/1914/nightfall?month=07&day=30&some=nightfall')">夕</span>
      </div>
      <section class='example-box'>
        <div class='example-head'># parent</div>
        <div class='mes'>I'm parent route: <code>/autumn/:year</code></div>
      </section>
      ${res.subRoute()}
    </div>
  `)

  let activeNames = /morn|nightfall/i.exec(location.href)
  if (activeNames) {
    let activePart = document.getElementById(activeNames[0])
    activePart.className += ' active'
  }
}

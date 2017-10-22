
export default function morn (req, res, next) {
  const { query, body } = req
  
  res.render(`
  <section class='example-box'>
    <div class='example-head'># ${query.some}</div>
    <div>Current Day: <code>${body.parsedByMiddleware}</code></div>
    <div class='mes'>
    【亲爱的isak 现在我正坐在我们第一次见面的地方 想着你 马上就要到21:21了 我有千言万语要告诉你 我很抱歉吓到了你 我很抱歉伤害了你 我很抱歉没有告诉你我有躁郁症 我害怕失去你 我忘记了没有人会被失去 因为每个人都是孤独的 记住 在宇宙的另一个地方 我们永远的在一起 爱你 even】     
    </div>
  </section>
  `)
}

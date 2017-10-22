
export default function nightfall (req, res, next) {
  const { query, body } = req
  
  res.render(`
  <section class='example-box'>
    <div class='example-head'># ${query.some}</div>
    <div>Current Day: <code>${body.parsedByMiddleware}</code></div>
    <div class='mes'>
      Mathilda: Is life always this hard.
      <br>
      Mathilda: Or is it just when you're a kid?
      <br>
      Leon: Always like this.
    </div>
  </section>
  `)
}

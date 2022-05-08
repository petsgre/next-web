const express = require("express")
const next = require("next")

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const { createProxyMiddleware } = require("http-proxy-middleware")

app.prepare().then(() => {
  const server = express()

  server.use(
    "/api/**",
    createProxyMiddleware({
      target: "http://192.168.1.104:8020",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
      cookieDomainRewrite: "localhost",
      onProxyRes: (proxyRes, req, res) => {
        // log original request and proxied request info
        const exchange = `[${req.method}] [${proxyRes.statusCode}] ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`
        // [GET] [200] / -> http://www.example.com
        console.log(
          "🚀 ~ file: server.js ~ line 26 ~ app.prepare ~ exchange",
          exchange
        )
      },
    })
  )

  server.all("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

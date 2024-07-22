const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({
    target: 'https://sites.google.com/view/saddiqurrehman/home?authuser=0',
    changeOrigin: true,
    pathRewrite: {
        '^/': '',
    },
    onProxyRes(proxyRes, req, res) {
        proxyRes.headers['X-Frame-Options'] = 'ALLOWALL';
        proxyRes.headers['Content-Security-Policy'] = "frame-ancestors 'self'";
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});

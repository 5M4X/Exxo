import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const inlineReactRefreshPreamble = `<script type="module">import { injectIntoGlobalHook } from "/@react-refresh";
injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;</script>`

const externalReactRefreshPreamble = {
  name: 'exxo:external-react-refresh-preamble',
  transformIndexHtml: {
    order: 'post',
    handler(html) {
      return html.replace(
        inlineReactRefreshPreamble,
        '<script type="module" src="/src/react-refresh-preamble.js"></script>',
      )
    },
  },
}

const sharedSecurityHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
}

const developmentSecurityHeaders = {
  ...sharedSecurityHeaders,
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; connect-src 'self' ws: http://localhost:* http://127.0.0.1:*; font-src 'self'; form-action 'none'; frame-ancestors 'none'; img-src 'self' data:; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'",
}

const productionSecurityHeaders = {
  ...sharedSecurityHeaders,
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self'; form-action 'none'; frame-ancestors 'none'; img-src 'self' data:; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'",
}

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Exxo/' : '/',
  plugins: [react(), externalReactRefreshPreamble],
  build: {
    sourcemap: false,
  },
  server: {
    headers: developmentSecurityHeaders,
  },
  preview: {
    headers: productionSecurityHeaders,
  },
})

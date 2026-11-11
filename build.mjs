// node build.mjs: builds docs/ (installable app for GitHub Pages) and the claude.ai artifact (../cviceni.html or out/artifact.html)
import fs from "fs";
const r = f => fs.readFileSync("src/" + f, "utf8");
const version = Date.now().toString(36);
const css = r("styles.css"), body = r("body.html"), app = r("app.js").replace("__VERSION__", version);
const fonts = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow+Semi+Condensed:wght@600;700&family=Barlow:wght@400;500;600;700&display=swap">';
const JSPDF = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
const html = `<!doctype html>
<html lang="cs"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Trénink</title>
<meta name="description" content="Denisův tréninkový deník: série, váhy, míry postavy, přehledy a PDF reporty.">
<meta name="theme-color" content="#0f1215" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#e9ecef" media="(prefers-color-scheme: light)">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Trénink">
${fonts}
<style>[hidden]{display:none!important}:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}
${css}</style></head><body>
${body}
<script>${app}</script>
<script>if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js");</script>
</body></html>
`;
fs.writeFileSync("docs/index.html", html);
fs.writeFileSync("docs/.nojekyll", "");
fs.writeFileSync("docs/manifest.webmanifest", JSON.stringify({
  name: "Trénink – Denisův deník", short_name: "Trénink", description: "Série, váhy, míry postavy, přehledy a PDF reporty",
  lang: "cs", start_url: "./", scope: "./", display: "standalone", orientation: "portrait",
  background_color: "#15181c", theme_color: "#15181c",
  icons: [{ src: "icons/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }],
}, null, 2));
fs.writeFileSync("docs/sw.js", `const V = "trenink-${version}";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./fonts/DejaVuSans.ttf", "./fonts/DejaVuSans-Bold.ttf"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request, u = new URL(req.url); if (req.method !== "GET") return;
  if (req.mode === "navigate") { e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(V).then(x => x.put("./index.html", c)); return r; }).catch(() => caches.match("./index.html"))); return; }
  if (u.origin === location.origin || /fonts\\.(googleapis|gstatic)\\.com$/.test(u.hostname) || u.href === "${JSPDF}") {
    e.respondWith(caches.match(req).then(hit => { const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(V).then(x => x.put(req, c)); } return r; }).catch(() => hit); return hit || net; }));
  }
});
`);
// in the portfolio repo the artifact sits next to app/, in its own repo it goes to out/ (gitignored)
const artOut = fs.existsSync("../cviceni.html") ? "../cviceni.html" : (fs.mkdirSync("out", { recursive: true }), "out/artifact.html");
fs.writeFileSync(artOut, `<title>Denisův trénink</title>
<meta name="claude:viewport-fit-sides" content="cover">
${fonts}
<style>
${css}</style>

${body}

<script>
${app}</script>
`);
console.log("built", version, html.length);

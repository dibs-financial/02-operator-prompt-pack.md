// Renders <App /> to plain HTML and writes static/index.html so the site can be
// hosted with no build step. static/styles.css is a copy of src/index.css.
// Run: npm run export:static
import { build } from "esbuild";
import { createRequire } from "node:module";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "static");
mkdirSync(out, { recursive: true });

// Bundle the app (minus CSS) to a CommonJS string and evaluate it in-process.
const result = await build({
  entryPoints: [resolve(root, "src/App.tsx")],
  bundle: true,
  write: false,
  platform: "node",
  format: "cjs",
  jsx: "automatic",
  loader: { ".css": "empty" },
  external: ["react", "react-dom"],
  logLevel: "silent",
});
const require = createRequire(import.meta.url);
const mod = { exports: {} };
new Function("module", "exports", "require", result.outputFiles[0].text)(mod, mod.exports, require);
const App = mod.exports.default;

const { renderToStaticMarkup } = require("react-dom/server");
const React = require("react");
const body = renderToStaticMarkup(React.createElement(App));

// Reuse the Vite HTML shell: swap the module script for the static markup and a
// tiny inline script for the mobile menu. FAQ uses <details>, so it needs no JS.
const shell = readFileSync(resolve(root, "index.html"), "utf8");
const html = shell
  .replace('<link rel="icon" href="/favicon.svg" type="image/svg+xml" />', '<link rel="icon" href="favicon.svg" type="image/svg+xml" />\n    <link rel="stylesheet" href="styles.css" />')
  .replace(
    /<div id="root"><\/div>\s*<script type="module" src="\/src\/main.tsx"><\/script>/,
    `<div id="root">${body}</div>
    <script>
      (function () {
        var btn = document.querySelector(".burger");
        var header = document.querySelector(".nav");
        if (!btn || !header) return;
        var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a, .nav-cta a"));
        var menu = document.createElement("div");
        menu.className = "wrap";
        menu.hidden = true;
        var nav = document.createElement("nav");
        nav.className = "mobile-menu";
        nav.id = "mobile-menu";
        nav.setAttribute("aria-label", "Mobile");
        links.forEach(function (a) {
          var c = a.cloneNode(true);
          c.className = a.className.replace("small", "").trim();
          c.addEventListener("click", function () { close(); });
          nav.appendChild(c);
        });
        menu.appendChild(nav);
        header.appendChild(menu);
        function close() { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-label", "Open menu"); }
        btn.addEventListener("click", function () {
          var open = menu.hidden;
          menu.hidden = !open;
          btn.setAttribute("aria-expanded", String(open));
          btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        });
        window.matchMedia("(min-width: 981px)").addEventListener("change", function (e) { if (e.matches) close(); });
      })();
    </script>`
  );

writeFileSync(resolve(out, "index.html"), html);
copyFileSync(resolve(root, "src/index.css"), resolve(out, "styles.css"));
copyFileSync(resolve(root, "public/favicon.svg"), resolve(out, "favicon.svg"));
console.log("static/index.html, static/styles.css, static/favicon.svg written");

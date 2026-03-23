import { resolve } from "path";
import { readdirSync, statSync } from "fs";
import { defineConfig } from "vite";

// Auto-discover version folders (old/, v1/, v2/, etc.)
const input = { main: resolve(__dirname, "index.html") };
const dirs = readdirSync(__dirname).filter((d) => {
  if (!statSync(resolve(__dirname, d)).isDirectory()) return false;
  try {
    statSync(resolve(__dirname, d, "index.html"));
    return true;
  } catch {
    return false;
  }
});
for (const dir of dirs) {
  if (["node_modules", "dist", ".vercel", "assets", ".git"].includes(dir)) continue;
  input[dir] = resolve(__dirname, dir, "index.html");
}

export default defineConfig({
  build: {
    rollupOptions: { input },
  },
});

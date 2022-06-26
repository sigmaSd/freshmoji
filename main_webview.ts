import { SizeHint, Webview } from "https://deno.land/x/webview@0.7.3/mod.ts";
import { dirname, join } from "https://deno.land/std@0.139.0/path/mod.ts";

const worker = new Worker(
  join(dirname(import.meta.url), "main.ts"),
  { type: "module" },
);

await new Promise((r) => setTimeout(r, 1000));
const webview = new Webview();
webview.size = {
  width: 500,
  height: 400,
  hint: SizeHint.FIXED,
};

webview.navigate("http://localhost:8000/");
webview.run();

worker.terminate();

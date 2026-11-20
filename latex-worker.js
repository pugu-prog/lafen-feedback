// SauerBeen: pdfTeX (busytex, WebAssembly) im Browser – Web Worker fir de PDF fir den Trainer.
// Engine + TeX-Bündel kommen vum PPREN-LaTeX-Repo (pugu-prog.github.io/ppren-latex/, selwecht Origin, selwechte Browser-Cache).
// Basis-URL: ?base=... (Standard: https://pugu-prog.github.io/ppren-latex/). Keng Daten verloossen de Browser.
const BASIS = new URL(self.location.href).searchParams.get("base") || "https://pugu-prog.github.io/ppren-latex/";
importScripts(BASIS + "busytex_pipeline.js");

let bereit = null;

async function entpacken(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(url + ": HTTP " + r.status);
  return new Uint8Array(await new Response(r.body.pipeThrough(new DecompressionStream("gzip"))).arrayBuffer());
}

function mkdirP(FS, pfad) {
  let teil = "";
  for (const s of pfad.split("/").slice(1, -1)) {
    teil += "/" + s;
    try { FS.mkdir(teil); } catch (e) { /* gëtt et schonn */ }
  }
}

async function starten() {
  const wasm = await entpacken(BASIS + "busytex.wasm.gz");
  const wasmUrl = URL.createObjectURL(new Blob([wasm], { type: "application/wasm" }));
  const pipeline = new BusytexPipeline(BASIS + "busytex.js", wasmUrl, [], [], [], () => {}, () => {}, true, BusytexPipeline.ScriptLoaderWorker);
  const [Module, buendel] = await Promise.all([pipeline.Module, entpacken(BASIS + "ppren-texmf.bin.gz")]);
  const kopfLaengt = new DataView(buendel.buffer, buendel.byteOffset).getUint32(0);
  const liste = JSON.parse(new TextDecoder().decode(buendel.subarray(4, 4 + kopfLaengt)));
  let pos = 4 + kopfLaengt;
  mkdirP(Module.FS, "/bin/busytex");
  Module.FS.writeFile("/bin/busytex", " ");
  for (const [pfad, laengt] of liste) {
    mkdirP(Module.FS, pfad);
    Module.FS.writeFile(pfad, buendel.subarray(pos, pos + laengt));
    pos += laengt;
  }
  return pipeline;
}

onmessage = async ({ data }) => {
  const { id, typ } = data;
  try {
    if (typ === "init") {
      bereit = bereit || starten();
      await bereit;
      postMessage({ id, ok: true });
    } else if (typ === "kompileieren") {
      if (!bereit) throw new Error("Net initialiséiert");
      const pipeline = await bereit;
      const dateien = [{ path: "main.tex", contents: data.tex }].concat((data.files || []).map(f => ({ path: f.path, contents: f.contents })));
      const r = await pipeline.compile(dateien, "main.tex", false, "silent", "pdftex_bibtex8", []);
      if (r.pdf && r.pdf.length) postMessage({ id, ok: true, pdf: r.pdf }, [r.pdf.buffer]);
      else postMessage({ id, ok: false, error: "LaTeX-Feeler", log: String(r.log || "").slice(-3000) });
    }
  } catch (e) {
    postMessage({ id, ok: false, error: String(e && e.message || e) });
  }
};

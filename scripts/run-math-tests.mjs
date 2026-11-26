import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const nodeRequire = createRequire(import.meta.url);
const cache = new Map();

function resolveTsFile(specifier, fromDir) {
  let base;
  if (specifier.startsWith("@/")) {
    base = path.join(rootDir, "src", specifier.slice(2));
  } else if (specifier.startsWith(".")) {
    base = path.resolve(fromDir, specifier);
  } else {
    return null;
  }

  const candidates = [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  throw new Error(`Cannot resolve ${specifier} from ${fromDir}`);
}

function loadTsModule(filePath) {
  const abs = path.resolve(filePath);
  if (cache.has(abs)) return cache.get(abs).exports;

  const source = fs.readFileSync(abs, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: abs,
  });

  const mod = { exports: {} };
  cache.set(abs, mod);
  const dir = path.dirname(abs);

  const localRequire = (spec) => {
    const resolved = resolveTsFile(spec, dir);
    if (resolved) return loadTsModule(resolved);
    return nodeRequire(spec);
  };

  const fn = new vm.Script(`(function(exports, require, module, __filename, __dirname) {\n${outputText}\n})`, {
    filename: abs,
  }).runInThisContext();

  fn(mod.exports, localRequire, mod, abs, dir);
  return mod.exports;
}

loadTsModule(path.join(rootDir, "scripts", "verify-math.ts"));

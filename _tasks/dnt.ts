import { build } from "https://deno.land/x/dnt@0.26.0/mod.ts"
import * as fs from "../deps/std/fs.ts"
import * as path from "../deps/std/path.ts"

const outDir = path.join("target", "npm")

await fs.emptyDir(outDir)

await Promise.all([
  build({
    entryPoints: ["mod.ts"],
    outDir,
    mappings: {
      "https://deno.land/x/wat_the_crypto@v0.0.1/mod.ts": {
        name: "wat-the-crypto",
        version: "^0.0.1",
      },
      "https://deno.land/x/scale@v0.9.1/mod.ts": {
        name: "scale-codec",
        version: "^0.9.1",
      },
      "https://deno.land/x/zones@v0.1.0-beta.13/mod.ts": {
        name: "zones",
        version: "0.1.0-beta.13",
      },
      "https://deno.land/x/smoldot@light-js-deno-v0.7.6/index-deno.js": {
        name: "@substrate/smoldot-light",
        version: "0.7.6",
      },
      "https://raw.githubusercontent.com/paritytech/capi-crypto-wrappers/14289c5/lib.ts":
        "https://raw.githubusercontent.com/paritytech/capi-crypto-wrappers/14289c5/lib.node.ts",
    },
    package: {
      name: "capi",
      version: Deno.args[0]!,
      description: "A TypeScript toolkit for crafting interactions with Substrate-based chains",
      license: "Apache-2.0",
      repository: "github:paritytech/capi",
    },
    compilerOptions: {
      lib: ["dom", "esnext"],
      importHelpers: true,
      sourceMap: true,
      target: "ES2021",
    },
    scriptModule: false,
    shims: {
      deno: {
        test: true,
      },
      webSocket: true,
    },
    test: false,
    typeCheck: false,
  }),
  fs.copy("LICENSE", path.join(outDir, "LICENSE")),
  fs.copy("Readme.md", path.join(outDir, "Readme.md")),
])

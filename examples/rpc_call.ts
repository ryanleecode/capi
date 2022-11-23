import * as C from "http://localhost:5646/@local/mod.ts"
import * as U from "http://localhost:5646/@local/util/mod.ts"

const root = C.rpcCall<[], string[]>("rpc_methods")(C.polkadot)()

console.log(U.throwIfError(await root.run()))

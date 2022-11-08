import * as Z from "../deps/zones.ts";
import * as rpc from "../rpc/mod.ts";
import * as U from "../util/mod.ts";
import { $extrinsic } from "./$extrinsic.ts";
import { deriveCodec } from "./deriveCodec.ts";
import { metadata } from "./metadata.ts";
import { chain } from "./rpc_known.ts";

const k0_ = Symbol();

export function blockRead<Client extends Z.$<rpc.Client>>(client: Client) {
  return <Rest extends [blockHash?: Z.$<U.HexHash | undefined>]>(...[blockHash]: [...Rest]) => {
    const metadata_ = metadata(client)(blockHash);
    const $extrinsic_ = $extrinsic(deriveCodec(metadata_), metadata_, null!);
    const call = chain.getBlock(client)(blockHash);
    return Z
      .ls($extrinsic_, call)
      .next(([$extrinsic_, call]) => {
        const { block: { extrinsics, header }, justifications } = call;
        return {
          justifications,
          block: {
            header,
            extrinsics: extrinsics.map((extrinsic) => {
              return $extrinsic_.decode(U.hex.decode(extrinsic));
            }),
          },
        };
      }, k0_)
      .zoned("BlockRead");
  };
}

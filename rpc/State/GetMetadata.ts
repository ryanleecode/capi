import * as u from "/_/util/mod.ts";
import * as common from "/rpc/common.ts";
import * as sys from "/system/mod.ts";

// TODO: enable retrieval at particular hash
// TODO: model `Hash` primitive in a `primitives/Hash.ts`
export const StateGetMetadata = <
  Beacon,
  Resource extends sys.AnyEffectA<sys.ResourceResolved<Beacon>>,
>(resource: Resource) => {
  return sys.effect<string>()(
    "StateGetMetadata",
    { resource },
    (_, resolved) => {
      return common.call(resolved.resource, "state_getMetadata", u.isStr);
    },
  );
};

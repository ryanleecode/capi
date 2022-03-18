import * as u from "/_/util/mod.ts";
import * as common from "/rpc/common.ts";
import * as sys from "/system/mod.ts";

export const SystemName = <
  Beacon,
  Resource extends sys.AnyEffectA<sys.ResourceResolved<Beacon>>,
>(resource: Resource) => {
  return sys.effect<string>()(
    "SystemName",
    { resource },
    async (_, resolved) => {
      return common.call(resolved.resource, "system_name", u.isStr);
    },
  );
};

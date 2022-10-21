import * as C from "../mod.ts";
import * as T from "../test_util/mod.ts";
import * as U from "../util/mod.ts";

const root = new C.EntryWatch(T.polkadot, "Timestamp", "Now", [], (stop) => {
  let i = 0;
  return (m) => {
    i++;
    console.log({ [i]: m });
    if (i === 5) {
      stop();
    }
  };
});

U.throwIfError(await C.run(root));

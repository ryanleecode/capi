import { StorageEntryResolved } from "/frame/StorageEntry.ts";
import { StorageKeyEncoded } from "/frame/StorageKeyEncoded.ts";
import { TypeDecoded } from "/frame/TypeDecoded.ts";
import * as rpc from "/rpc/State/GetStorage.ts";
import * as sys from "/system/mod.ts";

export const StorageMapValue = <
  Beacon,
  StorageEntry extends sys.AnyEffectA<StorageEntryResolved<Beacon>>,
  KeyA extends sys.AnyEffect,
  KeyB extends sys.AnyEffect,
>(
  storageEntry: StorageEntry,
  keyA: KeyA,
  keyB?: KeyB,
) => {
  const a = sys.then(storageEntry);

  const metadata = a((r) => r.chain.metadata);
  const palletName = a((r) => r.palletName);
  const name = a((r) => r.raw.name);
  const typeIndex = a((r) => r.raw.type.value);
  const resource = a((r) => r.chain.resource);

  const keyEncoded = StorageKeyEncoded(metadata, palletName, name, keyA, keyB);
  // TODO: fix this typing
  const x = keyEncoded.deps.keys.deps[1]; // TODO: should be `AnyEffect`... definitively
  const getStorageResult = rpc.StateGetStorage(resource, keyEncoded);
  return TypeDecoded(metadata, typeIndex, getStorageResult);
};

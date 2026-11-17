import type { StorageKey } from './keys';
import { createMMKV, MMKV } from 'react-native-mmkv';

const mmkv = createMMKV({
  id: 'app-storage',
});

export const Storage = {
  set(key: StorageKey, value: unknown) {
    mmkv.set(key, JSON.stringify(value));
  },
  get<T = unknown>(key: StorageKey): T | string | null {
    const raw = mmkv.getString(key);
    if (raw === null || raw === undefined) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw;
    }
  },
  remove(key: StorageKey) {
    mmkv.remove(key);
  },
  clearAll() {
    mmkv.clearAll();
  },
};

import { Storage } from '../services/storage';
import { StorageKeys } from '../services/storage/keys';

export interface SavedSubscription {
  planId: 'monthlyTrial' | 'monthly' | 'annual';
  promoCode: string | null;
}

export const saveSubscriptionData = (data: SavedSubscription) => {
  Storage.set(StorageKeys.SUBSCRIPTION, data);
};

export const getSubscriptionData = (): SavedSubscription | null => {
  return Storage.get<SavedSubscription>(
    StorageKeys.SUBSCRIPTION,
  ) as SavedSubscription | null;
};

export const clearSubscriptionData = () => {
  Storage.remove(StorageKeys.SUBSCRIPTION);
};

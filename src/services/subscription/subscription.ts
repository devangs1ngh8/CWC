import { apiGet } from '../api/http';

export interface MySubscriptionType {
  _id: string;
  title: string;
  planName: string;
  description: string[];
  price: {
    amount: number;
    unit: string;
  };
  interval: number;
  appleProductId: string;
  appleLocalizedPrice: string | null;
  optionType: number;
  paymentProvider: number;
  isFreeTrial: number;
  expireAt: string;
  expireInDays: number;
  trialDuration: {
    value: number;
    unit: number;
  };
}

export interface MySubscriptionResponse {
  status: number;
  message: string;
  data: MySubscriptionType | null;
  timestamp: string;
}

export const getMySubscription = () => {
  return apiGet<MySubscriptionResponse>('/common/payment/my-subscription');
};

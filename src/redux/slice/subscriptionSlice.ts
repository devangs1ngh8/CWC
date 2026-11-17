import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SubscriptionPlanId = 'monthlyTrial' | 'monthly' | 'annual';

interface SubscriptionState {
  selectedPlanId: SubscriptionPlanId | null;
  promoCode: string | null;
}

const initialState: SubscriptionState = {
  selectedPlanId: null,
  promoCode: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    selectPlan: (state, action: PayloadAction<SubscriptionPlanId>) => {
      state.selectedPlanId = action.payload;
    },

    setPromoCode: (state, action: PayloadAction<string | null>) => {
      state.promoCode = action.payload;
    },

    clearSubscription: () => initialState,
  },
});

export const { selectPlan, setPromoCode, clearSubscription } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;

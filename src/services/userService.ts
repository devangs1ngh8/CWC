import { apiDelete } from './api/http';

export const deleteAccount = async () => {
  try {
    const response = await apiDelete('/user/onboarding/delete-account');

    console.log('DELETE ACCOUNT SUCCESS:', response);

    return response;
  } catch (error: any) {
    console.log('DELETE ACCOUNT ERROR:', {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    throw error;
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = 'userProfile';

export type UserProfile = {
  name?: string;
  email?: string;
  phone?: string;
  dob?: string | null;
  height?: string;
  heightUnit?: string;
  weight?: string;
  weightUnit?: string;
  lactating?: string;
  contraceptive?: string;
  bleedTimeline?: string;
  lastMenstruationDate?: string | null;
  cycleLength?: string;
  state?: string;
  city?: string;
  parish?: string;
  pastor?: string;
};

export const getProfileData = async (): Promise<UserProfile> => {
  try {
    const data = await AsyncStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.log('Error loading profile:', error);
    return {};
  }
};

export const saveProfileData = async (
  updates: Partial<UserProfile>,
): Promise<void> => {
  try {
    const currentProfile = await getProfileData();

    await AsyncStorage.setItem(
      PROFILE_KEY,
      JSON.stringify({ ...currentProfile, ...updates }),
    );
  } catch (error) {
    console.log('Error saving profile:', error);
  }
};

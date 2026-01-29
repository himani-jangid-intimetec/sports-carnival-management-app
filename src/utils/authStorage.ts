import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'APP_USER';

export type StoredUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'organizer' | 'participant';
};

export const saveUser = async (user: StoredUser) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async (): Promise<StoredUser | null> => {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearUser = async () => {
  return AsyncStorage.removeItem(USER_KEY);
};

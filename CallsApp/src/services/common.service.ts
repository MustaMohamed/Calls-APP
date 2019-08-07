import AsyncStorage from '@react-native-community/async-storage';


export const saveToLocalStorageAsync = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getFromLocalStorageAsync = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // error reading value
    return null;
  }
};

export const removeFromLocaleStorageAsync = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
  }
};

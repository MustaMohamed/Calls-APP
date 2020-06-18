import AsyncStorage from '@react-native-community/async-storage';


export const saveToLocalStorageAsync = async (key: string, value: any): Promise<any> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return result = await getFromLocalStorageAsync(key);
  } catch (e) {
    // saving error
  }
};

export const getFromLocalStorageAsync = async (key: string): Promise<any> => {
  try {
    return JSON.parse(await AsyncStorage.getItem(key));
  } catch (e) {
    // error reading value

  }
};

export const removeFromLocaleStorageAsync = async (key: string): Promise<any> => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
  }
};

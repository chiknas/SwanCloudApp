import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_ITEMS} from './type';

export const getStorageItem = async (item: STORAGE_ITEMS) => {
  try {
    const jsonValue = await AsyncStorage.getItem(item);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const storeItem = async (item: STORAGE_ITEMS, value: any) => {
  try {
    return await AsyncStorage.setItem(item, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

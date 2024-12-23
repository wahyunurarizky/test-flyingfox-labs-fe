import axios from 'axios';
import { MenuData } from './definitions';

export const getMenus = async () => {
  try {
    const apiUrl = process.env.API_URL;
    const pathApiMenu = process.env.PATH_API_MENU;

    console.log('apiUrl:', apiUrl);

    const response = await axios.get<MenuData[]>(`${apiUrl}/${pathApiMenu}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    return [];
  }
};

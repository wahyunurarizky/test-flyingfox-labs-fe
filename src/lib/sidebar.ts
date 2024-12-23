import axios from 'axios';
import { MenuData } from './definitions';

export const getMenus = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const pathApiMenu = process.env.NEXT_PUBLIC_PATH_API_MENU;

  const response = await axios.get<MenuData[]>(`${apiUrl}/${pathApiMenu}`);
  return response.data;
};

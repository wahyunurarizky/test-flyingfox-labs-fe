export interface MenuData {
  id: string;
  name: string;
  depth: number;
  parentId: string | null;
  children?: MenuData[];
}

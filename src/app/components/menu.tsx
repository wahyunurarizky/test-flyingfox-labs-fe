'use client';

import axios from 'axios';
import { useState } from 'react';
import TreeView from 'react-treeview';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MenuData } from '@/lib/definitions';

export default function Menu({ menus }: { menus: MenuData[] }) {
  const [menuHierarchy, setMenuHierarchy] = useState<MenuData | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [newMenuName, setNewMenuName] = useState<string>('');
  const [selectedParent, setSelectedParent] = useState<MenuData | null>(null);

  const handleMenuSelect = async (id: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PATH_API_MENU}/${id}`);
      setMenuHierarchy(response.data);
      setExpanded([]); // Reset expanded state
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const toggleExpandAll = (expand: boolean) => {
    if (menuHierarchy) {
      const allNodes = getAllNodeIds(menuHierarchy);
      setExpanded(expand ? allNodes : []);
    }
  };

  const getAllNodeIds = (menu: MenuData, ids: string[] = []): string[] => {
    ids.push(menu.id);
    if (menu.children) {
      menu.children.forEach((child) => getAllNodeIds(child, ids));
    }
    return ids;
  };

  const renderTree = (menu: MenuData) => (
    <TreeView key={menu.id} nodeLabel={menu.name} collapsed={!expanded.includes(menu.id)} onClick={() => toggleNode(menu.id)}>
      {menu.children?.map((child) => renderTree(child))}
      <button onClick={() => handleAddChildClick(menu)} className="ml-4 text-blue-500">
        + Add Child
      </button>
    </TreeView>
  );

  const toggleNode = (nodeId: string) => {
    setExpanded((prev) => (prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]));
  };

  const handleAddChildClick = (parent: MenuData) => {
    setSelectedParent(parent);
    setNewMenuName('');
  };

  const handleAddMenu = async () => {
    if (!newMenuName || !selectedParent) return;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_PATH_API_MENU}`, {
        name: newMenuName,
        parentId: selectedParent.id
      });
      setMenuHierarchy((prev) => updateMenuHierarchy(prev, response.data));
      setNewMenuName('');
      setSelectedParent(null);
    } catch (error) {
      console.error('Error adding menu:', error);
    }
  };

  const updateMenuHierarchy = (menu: MenuData | null, newMenu: MenuData): MenuData | null => {
    if (!menu) return menu;
    if (menu.id === newMenu.parentId) {
      menu.children = [...(menu.children || []), newMenu];
    } else {
      menu.children?.forEach((child) => updateMenuHierarchy(child, newMenu));
    }
    return menu;
  };

  return (
    <div className="grid grid-cols-2 gap-4 py-10 p-8">
      <div>
        <Select onValueChange={(id) => handleMenuSelect(id)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Menu" />
          </SelectTrigger>
          <SelectContent>
            {menus.length > 0 &&
              menus.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <div className="mt-6">
          {menuHierarchy ? (
            <div>
              <div className="flex space-x-4 mb-4">
                <button onClick={() => toggleExpandAll(true)} className="px-4 py-2 bg-blue-500 text-white rounded">
                  Expand All
                </button>
                <button onClick={() => toggleExpandAll(false)} className="px-4 py-2 bg-red-500 text-white rounded">
                  Collapse All
                </button>
              </div>
              <div>{renderTree(menuHierarchy)}</div>
            </div>
          ) : (
            <p>Please select a menu to see the hierarchy.</p>
          )}
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        {selectedParent && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Add New Menu Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent ID</label>
                <input className="border border-gray-300 p-2 w-full bg-gray-200 text-gray-600 rounded" type="text" value={selectedParent.id} disabled />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Depth</label>
                <input className="border border-gray-300 p-2 w-full bg-gray-200 text-gray-600 rounded" type="text" value={selectedParent.depth + 1} disabled />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Parent Name</label>
                <input className="border border-gray-300 p-2 w-full bg-gray-200 text-gray-600 rounded" type="text" value={selectedParent.name} disabled />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">New Name</label>
                <input
                  className="border border-gray-300 p-2 w-full rounded"
                  type="text"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  placeholder="Enter menu name"
                />
              </div>

              <div>
                <button onClick={handleAddMenu} className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  Add Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { getMenus } from '@/lib/sidebar';
import { FolderCode, Slash } from 'lucide-react';
import Menu from './components/menu';

export default async function Home() {
  const menus = await getMenus();

  return (
    <div className="flex flex-col min-h-screen py-10 p-8 ">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <FolderCode />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Menus</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Menu menus={menus} />
    </div>
  );
}

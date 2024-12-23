// app/layout.tsx
import { MySidebar } from '@/components/main/mySidebar';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getMenus } from '@/lib/sidebar';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const menus = await getMenus();

  return (
    <html lang="en">
      <body className="flex">
        <SidebarProvider className=" bg-white">
          <MySidebar menus={menus} />

          <main className="w-full">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}

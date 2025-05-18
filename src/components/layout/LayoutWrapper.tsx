
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { MainSidebar } from './MainSidebar';
import { Header } from './Header';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <SidebarProvider>
      <div className="grid-bg flex min-h-screen w-full">
        <MainSidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

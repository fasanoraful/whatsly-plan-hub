import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CompactLayoutProps {
  children: ReactNode;
}

const CompactLayout = ({ children }: CompactLayoutProps) => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto py-3 px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-1.5">
              <div className="text-whatsapp font-bold text-lg">UniZap</div>
              <span className="bg-whatsapp text-white text-[10px] px-1 py-0.5 rounded">CRM</span>
            </Link>
            <Button asChild size="sm" variant="ghost">
              <Link to="/">Início</Link>
            </Button>
          </div>
        </div>
      </div>
      <main className="pt-14">
        {children}
      </main>
    </div>
  );
};
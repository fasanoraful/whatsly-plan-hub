import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MinimalLayoutProps {
  children: ReactNode;
}

const MinimalLayout = ({ children }: MinimalLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-whatsapp font-bold text-xl">UniZap</div>
            <span className="bg-whatsapp text-white text-xs px-1.5 py-0.5 rounded-md">CRM</span>
          </Link>
          <Button asChild variant="ghost">
            <Link to="/">Voltar ao Início</Link>
          </Button>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-4 px-6 bg-gray-50 border-t">
        <div className="container mx-auto text-center text-sm text-gray-500">
          © 2025 UniZap CRM. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default MinimalLayout

import { Button } from "@/components/ui/button";

const Hero = () => {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6 bg-hero-pattern">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-whatsapp/10 text-whatsapp px-3 py-1 rounded-full text-sm font-medium">
                Novo
              </div>
              <div className="text-sm text-gray-600">
                Integração com múltiplos números
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transforme seu <span className="text-whatsapp">WhatsApp</span> em um poderoso CRM
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Gerencie contatos, automatize mensagens e aumente suas vendas com nossa extensão profissional para WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-whatsapp hover:bg-whatsappDark text-white px-8 py-6 text-lg"
                onClick={() => handleScrollToSection("pricing")}
              >
                Começar agora
              </Button>
              <Button 
                variant="outline" 
                className="border-whatsapp text-whatsapp hover:bg-whatsapp/10 px-8 py-6 text-lg"
                onClick={() => handleScrollToSection("how-it-works")}
              >
                Como funciona
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                  JD
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">
                  AK
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-xs">
                  MR
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold">+5.000</span> profissionais já estão usando
              </p>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-white rounded-2xl shadow-xl p-4 animate-float">
              <div className="bg-gray-100 rounded-xl p-2 flex flex-col gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-whatsapp">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">João Silva</div>
                      <div className="text-xs text-gray-500">+55 11 98765-4321</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">Cliente interessado no plano anual. Enviar proposta.</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-highlight">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Reunião de Vendas</div>
                      <div className="text-xs text-gray-500">Amanhã, 14:00</div>
                    </div>
                  </div>
                </div>
                <div className="bg-whatsapp/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-whatsapp">Desempenho</div>
                    <div className="text-xs text-gray-500">Hoje</div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-2xl font-bold">28</div>
                      <div className="text-xs text-gray-500">Mensagens</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs text-gray-500">Contatos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-xs text-gray-500">Vendas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full rounded-2xl bg-highlight/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

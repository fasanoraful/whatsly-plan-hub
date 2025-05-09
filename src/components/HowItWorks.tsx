
const steps = [
  {
    number: "01",
    title: "Instale a extensão",
    description: "Adicione nossa extensão ao seu navegador Chrome, Firefox ou Edge em apenas alguns cliques.",
    color: "bg-whatsapp",
  },
  {
    number: "02",
    title: "Conecte-se ao WhatsApp Web",
    description: "Acesse o WhatsApp Web normalmente e nossa extensão será ativada automaticamente.",
    color: "bg-highlight",
  },
  {
    number: "03",
    title: "Configure seu espaço de trabalho",
    description: "Personalize etiquetas, automações e preferências de acordo com suas necessidades.",
    color: "bg-whatsapp",
  },
  {
    number: "04",
    title: "Comece a usar os recursos",
    description: "Aproveite todos os recursos avançados de CRM diretamente na interface do WhatsApp.",
    color: "bg-highlight",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como <span className="text-highlight">funciona</span> nossa extensão
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comece a usar o UniZap CRM em minutos com nosso processo simples de configuração e integração com o WhatsApp Web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className={`${step.color} text-white font-bold rounded-full w-12 h-12 flex items-center justify-center`}>
                  {step.number}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 md:p-10 bg-gray-50 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Compatível com todos os principais navegadores</h3>
              <p className="text-gray-600 mb-6">
                Nossa extensão funciona perfeitamente no Chrome, Firefox, Edge e outros navegadores baseados em Chromium. Instale facilmente pela loja de extensões do seu navegador.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    C
                  </div>
                  <span>Chrome</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    F
                  </div>
                  <span>Firefox</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    E
                  </div>
                  <span>Edge</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-medium">WhatsApp Web</div>
                    <div className="flex">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/3 border-r border-gray-200 p-2">
                      <div className="bg-whatsapp/10 rounded-lg p-2 text-whatsapp text-sm font-medium mb-2">UniZap CRM</div>
                      <div className="space-y-2">
                        <div className="bg-white p-2 rounded shadow-sm">
                          <div className="text-xs font-medium">Contatos</div>
                        </div>
                        <div className="bg-white p-2 rounded shadow-sm">
                          <div className="text-xs font-medium">Campanhas</div>
                        </div>
                        <div className="bg-white p-2 rounded shadow-sm">
                          <div className="text-xs font-medium">Relatórios</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/3 p-2">
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm font-medium">Cliente Premium</div>
                        <div className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">Ativo</div>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-gray-200 h-3 rounded-full w-4/5"></div>
                        <div className="bg-gray-200 h-3 rounded-full w-3/5"></div>
                        <div className="bg-gray-200 h-3 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

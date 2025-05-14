import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Plan, ClientInfo } from "@/types";

const plans: Plan[] = [
  {
    id: "monthly",
    title: "Mensal",
    price: 35.0,
    features: [
      "Acesso completo a todos os recursos",
      "1 número de WhatsApp (possível alternância)",
      "Conversas ilimitadas",
      "Todas as automações",
      "Suporte 24/7 prioritário",
    ],
    color: "pricing-monthly",
    popular: false,
  },
  {
    id: "semiannual",
    title: "Semestral",
    price: 150.0,
    originalPrice: 260,
    features: [
      "Acesso completo a todos os recursos",
      "1 número de WhatsApp (possível alternância)",
      "Conversas ilimitadas",
      "Todas as automações",
      "Suporte 24/7 prioritário",
      "16% de desconto em relação ao plano mensal",
    ],
    color: "pricing-semiannual",
    popular: true,
  },
  {
    id: "annual",
    title: "Anual",
    price: 250.0,
    originalPrice: 320,
    features: [
      "Acesso completo a todos os recursos",
      "1 número de WhatsApp (possível alternância)",
      "Conversas ilimitadas",
      "Todas as automações",
      "Suporte 24/7 prioritário",
      "25% de desconto em relação ao plano semestral",
    ],
    color: "pricing-annual",
    popular: false,
  },
];

const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: "",
    email: "",
    whatsapp: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!clientInfo.name || !clientInfo.email || !clientInfo.whatsapp) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return false;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientInfo.email)) {
      toast.error("Por favor, informe um e-mail válido");
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/create-preference.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: selectedPlan,
          name: clientInfo.name,
          email: clientInfo.email,
          whatsapp: clientInfo.whatsapp,
        }),
      });

      const data = await response.json();
      if (data.init_point) {
        // Open Mercado Pago checkout in a new tab
        window.open(data.init_point, '_blank');

        // Keep the user on the current page
        setIsProcessing(false);

        // Redirect to success page
        navigate(`/sucesso?chave=${encodeURIComponent(data.license_response.message)}`);
      } else {
        throw new Error("Erro ao gerar link de pagamento.");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      toast.error("Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.");
      setIsProcessing(false);
    }
  };

  const selectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Scroll to the form
    setTimeout(() => {
      const formElement = document.getElementById('payment-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <section id="pricing" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planos e <span className="text-highlight">preços</span> acessíveis
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio e comece a usar todos os recursos do UniZap CRM.
          </p>
        </div>

        {/* Free Trial Banner */}
        <div className="bg-whatsapp/10 border border-whatsapp rounded-lg p-4 mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-whatsapp">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
            <h3 className="text-xl font-bold text-whatsappDark">Teste Grátis por 3 Dias!</h3>
          </div>
          <p className="text-gray-700">
            Experimente qualquer plano sem compromisso por 3 dias. Cancele quando quiser sem custos adicionais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.color} ${plan.id === selectedPlan ? "ring-2 ring-" + plan.color.replace("pricing-card-", "") : ""} bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg relative cursor-pointer`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-highlight text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Mais popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">R$ {plan.price.toFixed(2).replace(".", ",")}</span>
                {plan.originalPrice && (
                  <span className="text-gray-500 line-through ml-2">
                    R$ {plan.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                )}
                {plan.id === "monthly" && <span className="text-gray-500 text-sm">/mês</span>}
              </div>
              <div className="mb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-whatsapp mt-0.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2 text-whatsappDark font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-whatsapp mt-0.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-sm">3 dias de teste grátis</span>
                  </li>
                </ul>
              </div>
              <Button
                className={`w-full ${plan.id === selectedPlan
                  ? "bg-whatsapp hover:bg-whatsappDark text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => selectPlan(plan.id)}
              >
                {plan.id === selectedPlan ? "Selecionado" : "Selecionar"}
              </Button>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div id="payment-form" className="mt-12 max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8 animate-fadeIn">
            <div className="pt-3 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Plano selecionado</span>
                <span className="font-medium">
                  {plans.find(p => p.id === selectedPlan)?.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Valor total</span>
                <span className="font-bold text-xl">
                  R$ {plans.find(p => p.id === selectedPlan)?.price.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
                Seu período de teste grátis de 3 dias começa imediatamente após a finalização
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Seu nome completo"
                name="name"
                value={clientInfo.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                name="email"
                value={clientInfo.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="tel"
                placeholder="WhatsApp com DDD"
                name="whatsapp"
                value={clientInfo.whatsapp}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <Button
              className="w-full bg-whatsapp hover:bg-whatsappDark text-white py-6 text-lg"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processando..." : "Finalizar"}
            </Button>

            <div className="mt-4 text-center text-sm text-gray-500">
              Pagamento seguro processado pelo MercadoPago
              <div className="mt-2 flex justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Ambiente seguro</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingPlans;

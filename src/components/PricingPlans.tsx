
import { Button } from "@/components/ui/button";
import { useState } from "react";

const paymentMethods = [
  {
    id: "credit-card",
    title: "Cartão de Crédito",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>
    ),
  },
  {
    id: "pix",
    title: "PIX",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
  },
];

const plans = [
  {
    id: "monthly",
    title: "Mensal",
    price: 59.90,
    features: [
      "Acesso a todos os recursos básicos",
      "1 número de WhatsApp",
      "Até 1.000 conversas por mês",
      "Automações básicas",
      "Suporte por e-mail",
    ],
    color: "pricing-monthly",
    popular: false,
  },
  {
    id: "semiannual",
    title: "Semestral",
    price: 299.90,
    originalPrice: 359.40, // 6 * 59.90
    features: [
      "Acesso a todos os recursos avançados",
      "Até 3 números de WhatsApp",
      "Até 5.000 conversas por mês",
      "Automações avançadas",
      "Suporte prioritário",
      "16% de desconto em relação ao plano mensal",
    ],
    color: "pricing-semiannual",
    popular: true,
  },
  {
    id: "annual",
    title: "Anual",
    price: 539.90,
    originalPrice: 718.80, // 12 * 59.90
    features: [
      "Acesso completo a todos os recursos",
      "Números de WhatsApp ilimitados",
      "Conversas ilimitadas",
      "Todas as automações",
      "API para integrações",
      "Suporte 24/7 prioritário",
      "25% de desconto em relação ao plano mensal",
    ],
    color: "pricing-annual",
    popular: false,
  },
];

const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState("semiannual");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit-card");

  return (
    <section id="pricing" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planos e <span className="text-highlight">preços</span> acessíveis
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio e comece a usar todos os recursos do Whatsly CRM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`pricing-card ${plan.color} ${plan.id === selectedPlan ? "ring-2 ring-" + plan.color.replace("pricing-card-", "") : ""}`}
              onClick={() => setSelectedPlan(plan.id)}
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
                </ul>
              </div>
              <Button
                className={`w-full ${
                  plan.id === selectedPlan
                    ? "bg-whatsapp hover:bg-whatsappDark text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.id === selectedPlan ? "Selecionado" : "Selecionar"}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
          <h3 className="text-xl font-bold mb-4">Forma de pagamento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${
                  selectedPaymentMethod === method.id
                    ? "border-highlight bg-highlight/5"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedPaymentMethod(method.id)}
              >
                <div className={`${selectedPaymentMethod === method.id ? "text-highlight" : "text-gray-400"}`}>
                  {method.icon}
                </div>
                <div className="font-medium">{method.title}</div>
                {selectedPaymentMethod === method.id && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-highlight flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
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
          </div>
          
          <Button className="w-full bg-whatsapp hover:bg-whatsappDark text-white py-6 text-lg">
            Finalizar pagamento ({selectedPaymentMethod === "pix" ? "PIX" : "Cartão"})
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
      </div>
    </section>
  );
};

export default PricingPlans;

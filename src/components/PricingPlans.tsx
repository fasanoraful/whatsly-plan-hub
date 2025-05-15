import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Plan, ClientInfo } from "@/types";

const plans: Plan[] = [
  {
    id: "free",
    title: "Teste Grátis",
    price: 0.0,
    features: [
      "Acesso completo por 3 dias",
      "1 número de WhatsApp",
      "Conversas ilimitadas",
      "Todas as automações",
      "Suporte básico",
    ],
    color: "pricing-free",
    popular: false,
  },
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
  const [clientInfo, setClientInfo] = useState<ClientInfo>({ name: "", email: "", whatsapp: "" });
  const [renewMode, setRenewMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [userFound, setUserFound] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!clientInfo.name || !clientInfo.email || !clientInfo.whatsapp) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientInfo.email)) {
      toast.error("Por favor, informe um e-mail válido");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!selectedPlan) return;

    if (selectedPlan === "free" && !renewMode) {
      navigate(`/sucesso?chave=${encodeURIComponent(clientInfo.email || "teste@gratuito.com")}`);
      return;
    }

    if (!renewMode && !validateForm()) return;

    setIsProcessing(true);
    try {
      const response = await fetch("/api/create-preference.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan,
          name: clientInfo.name,
          email: clientInfo.email,
          whatsapp: renewMode ? phoneNumber : clientInfo.whatsapp,
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.open(data.init_point, "_blank");
        navigate(`/sucesso?chave=${encodeURIComponent(data.license_response?.message || clientInfo.email)}`);
      } else {
        throw new Error("Erro ao gerar link de pagamento.");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      toast.error("Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const selectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setTimeout(() => {
      document.getElementById("payment-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const toggleRenewMode = () => {
    setRenewMode(!renewMode);
    setUserFound(false);
    setPhoneNumber("");
    setSelectedPlan(null);
  };

  const searchSubscription = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Por favor, informe um número de telefone válido");
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch("/api/search-renew.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsapp: phoneNumber }),
      });

      const data = await response.json();
      if (data.status === true) {
        setUserFound(true);
        toast.success("Assinatura encontrada! Escolha um plano para renovar.");
        if (data.user) {
          setClientInfo({
            name: data.user.name || "",
            email: data.user.email || "",
            whatsapp: phoneNumber,
          });
        }
      } else {
        setUserFound(false);
        toast.error("Nenhuma assinatura encontrada para este número.");
      }
    } catch (error) {
      console.error("Erro ao buscar assinatura:", error);
      toast.error("Erro ao buscar sua assinatura. Tente novamente.");
    } finally {
      setIsSearching(false);
    }
  };

  const filteredPlans = renewMode ? plans.filter(plan => plan.id !== "free") : plans;
  const selectedPlanData = plans.find(p => p.id === selectedPlan);

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
          <div className="mt-6">
            <Button
              onClick={toggleRenewMode}
              className={`${renewMode ? "bg-gray-600" : "bg-whatsapp"} hover:opacity-90`}
            >
              {renewMode ? "Voltar para novos planos" : "Renovar assinatura existente"}
            </Button>
          </div>
        </div>

        {renewMode ? (
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
            <h3 className="text-xl font-bold mb-4">Renovar sua assinatura</h3>
            <p className="text-gray-600 mb-4">
              Informe o número de WhatsApp associado à sua conta para renovar sua assinatura.
            </p>
            <div className="flex space-x-2">
              <Input
                type="tel"
                placeholder="WhatsApp com DDD"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={searchSubscription} disabled={isSearching} className="bg-whatsapp hover:bg-whatsappDark">
                {isSearching ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-whatsapp/10 border border-whatsapp rounded-lg p-4 mb-8 text-center">
            <h3 className="text-xl font-bold text-whatsappDark mb-2">
              Teste Grátis por 3 Dias!
            </h3>
            <p className="text-gray-700">
              Experimente qualquer plano sem compromisso por 3 dias. Cancele quando quiser sem custos adicionais.
            </p>
          </div>
        )}

        {(!renewMode || (renewMode && userFound)) && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card ${plan.color} ${plan.id === selectedPlan ? "ring-2 ring-" + plan.color.replace("pricing-", "") : ""} bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg relative cursor-pointer`}
                onClick={() => selectPlan(plan.id)}
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
                </div>
                <ul className="space-y-2 mb-6 text-sm text-gray-600">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-whatsapp mt-0.5">✔️</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.id == "free" && !renewMode && (
                    <li className="flex items-start gap-2 text-whatsappDark font-medium">
                      <span className="mt-0.5">🎁</span>
                      <span>3 dias de teste grátis</span>
                    </li>
                  )}
                </ul>
                <Button
                  className={`w-full ${plan.id === selectedPlan
                    ? "bg-whatsapp hover:bg-whatsappDark text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectPlan(plan.id);
                  }}
                >
                  {plan.id === selectedPlan ? "Selecionado" : "Selecionar"}
                </Button>
              </div>
            ))}
          </div>
        )}

        {selectedPlan && (!renewMode || userFound) && (
          <div id="payment-form" className="mt-12 max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Plano selecionado:</span>
                <span className="font-medium">{selectedPlanData?.title}</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Valor:</span>
                <span>R$ {selectedPlanData?.price.toFixed(2).replace(".", ",")}</span>
              </div>
              {selectedPlan !== "free" && !renewMode && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
                  Seu período de teste grátis de 3 dias começa imediatamente após a finalização
                </div>
              )}
            </div>

            {!renewMode && (
              <div className="space-y-4 mb-6">
                <Input type="text" name="name" placeholder="Nome completo" value={clientInfo.name} onChange={handleInputChange} />
                <Input type="email" name="email" placeholder="E-mail" value={clientInfo.email} onChange={handleInputChange} />
                <Input type="tel" name="whatsapp" placeholder="WhatsApp com DDD" value={clientInfo.whatsapp} onChange={handleInputChange} />
              </div>
            )}

            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-whatsapp hover:bg-whatsappDark text-white text-lg"
            >
              {isProcessing ? "Processando..." : "Finalizar pagamento"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingPlans;

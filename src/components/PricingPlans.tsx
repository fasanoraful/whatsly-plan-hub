import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";
import PlanCard from "./pricing/PlanCard";
import PaymentMethodSelector from "./pricing/PaymentMethodSelector";
import ClientInfoModal from "./pricing/ClientInfoModal";
import { plans } from "./pricing/plans";
import databaseService from "@/services/databaseService";

const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState("semiannual");
  const [isProcessing, setIsProcessing] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [showClientInfoModal, setShowClientInfoModal] = useState(false);
  const { toast: uiToast } = useToast();

  const handlePayment = async () => {
    setShowClientInfoModal(true);
  };

  const handleProcessPayment = async () => {
    if (!whatsappNumber || !clientName) {
      uiToast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setShowClientInfoModal(false);
    
    try {
      const user = await databaseService.createTrialUser({
        customerName: clientName,
        whatsappNumber: whatsappNumber
      });

      if (user) {
        window.location.href = `/sucesso?user_id=${user.user_id}`;
      } else {
        throw new Error("Falha ao criar usuário");
      }
    } catch (error) {
      console.error("Erro ao processar:", error);
      uiToast({
        title: "Erro",
        description: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const currentPlan = plans.find(p => p.id === selectedPlan);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlan === plan.id}
              onSelect={setSelectedPlan}
            />
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Plano selecionado</span>
              <span className="font-medium">
                {currentPlan?.title}
              </span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-whatsapp hover:bg-whatsappDark text-white py-6 text-lg"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Processando..." : "Começar período de teste grátis"}
          </Button>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            3 dias grátis, depois R$ {currentPlan?.price.toFixed(2).replace(".", ",")} por mês
          </div>
        </div>
      </div>

      <ClientInfoModal
        open={showClientInfoModal}
        onOpenChange={setShowClientInfoModal}
        whatsappNumber={whatsappNumber}
        setWhatsappNumber={setWhatsappNumber}
        clientName={clientName}
        setClientName={setClientName}
        onProcessPayment={handleProcessPayment}
      />
    </section>
  );
};

export default PricingPlans;
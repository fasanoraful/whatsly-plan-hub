
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";
import mercadoPagoService from "@/services/mercadoPagoService";
import licenseService from "@/services/licenseService";
import PlanCard from "./pricing/PlanCard";
import PaymentMethodSelector from "./pricing/PaymentMethodSelector";
import ClientInfoModal from "./pricing/ClientInfoModal";
import PixPaymentModal from "./pricing/PixPaymentModal";
import { plans } from "./pricing/plans";

const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState("semiannual");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [showClientInfoModal, setShowClientInfoModal] = useState(false);
  const [pixData, setPixData] = useState<{ qrCodeImage: string; copyPasteCode: string } | null>(null);
  const { toast: uiToast } = useToast();

  const handlePayment = async () => {
    // Show client info collection modal first
    setShowClientInfoModal(true);
  };

  const handleProcessPayment = async () => {
    // Validate client info
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
    
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) {
      setIsProcessing(false);
      uiToast({
        title: "Erro",
        description: "Plano não encontrado. Por favor, tente novamente.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (selectedPaymentMethod === "credit-card") {
        // For credit card payments, get checkout URL and redirect
        console.log("Processando pagamento com cartão para:", plan.title);
        
        const checkoutUrl = await mercadoPagoService.getCreditCardCheckoutUrl(
          plan.id,
          plan.title,
          plan.price
        );
        
        if (checkoutUrl) {
          // Create license after successful payment (in production this would be done via webhook)
          await licenseService.createLicenseAfterPayment(
            plan.id,
            whatsappNumber,
            clientName
          );
          
          // Redirect to Mercado Pago checkout
          window.location.href = checkoutUrl;
        } else {
          throw new Error("Falha ao obter URL de checkout");
        }
      } else if (selectedPaymentMethod === "pix") {
        // For PIX payments, show the QR code modal
        console.log("Gerando PIX para:", plan.title);
        
        const pixPaymentData = await mercadoPagoService.generatePixPayment(
          plan.id,
          plan.title,
          plan.price
        );
        
        if (pixPaymentData) {
          setPixData(pixPaymentData);
          setShowPixModal(true);
        } else {
          throw new Error("Falha ao gerar pagamento PIX");
        }
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      uiToast({
        title: "Erro",
        description: "Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePixPaymentConfirmed = async () => {
    try {
      // In a real implementation, you would check with your backend if the payment was actually received
      // For now, we'll just create the license and redirect to the success page
      
      await licenseService.createLicenseAfterPayment(
        selectedPlan,
        whatsappNumber,
        clientName
      );
      
      setShowPixModal(false);
      window.location.href = "https://site.com/sucesso";
    } catch (error) {
      console.error("Erro ao confirmar pagamento PIX:", error);
      uiToast({
        title: "Erro",
        description: "Ocorreu um erro ao confirmar seu pagamento. Por favor, tente novamente.",
        variant: "destructive",
      });
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
          <h3 className="text-xl font-bold mb-4">Forma de pagamento</h3>
          
          <PaymentMethodSelector
            selectedMethod={selectedPaymentMethod}
            onSelectMethod={setSelectedPaymentMethod}
          />
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Plano selecionado</span>
              <span className="font-medium">
                {currentPlan?.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Valor total</span>
              <span className="font-bold text-xl">
                R$ {currentPlan?.price.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-whatsapp hover:bg-whatsappDark text-white py-6 text-lg"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Processando..." : `Finalizar pagamento (${selectedPaymentMethod === "pix" ? "PIX" : "Cartão"})`}
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

      {/* Modals */}
      <ClientInfoModal
        open={showClientInfoModal}
        onOpenChange={setShowClientInfoModal}
        whatsappNumber={whatsappNumber}
        setWhatsappNumber={setWhatsappNumber}
        clientName={clientName}
        setClientName={setClientName}
        onProcessPayment={handleProcessPayment}
      />

      <PixPaymentModal
        open={showPixModal}
        onOpenChange={setShowPixModal}
        pixData={pixData}
        onPaymentConfirmed={handlePixPaymentConfirmed}
      />
    </section>
  );
};

export default PricingPlans;

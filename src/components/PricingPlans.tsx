
import { useState } from "react";
import { QrCode, Copy, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import mercadoPagoService from "@/services/mercadoPagoService";
import licenseService from "@/services/licenseService";

const paymentMethods = [
  {
    id: "credit-card",
    title: "Cartão de Crédito",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "pix",
    title: "PIX",
    icon: <Zap className="h-5 w-5" />,
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [showClientInfoModal, setShowClientInfoModal] = useState(false);
  const [pixData, setPixData] = useState<{ qrCodeImage: string; copyPasteCode: string } | null>(null);
  const { toast } = useToast();

  const handlePayment = async () => {
    // Show client info collection modal first
    setShowClientInfoModal(true);
  };

  const handleProcessPayment = async () => {
    // Validate client info
    if (!whatsappNumber || !clientName) {
      toast({
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
      toast({
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
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const copyPIXCode = () => {
    if (!pixData) return;
    
    navigator.clipboard.writeText(pixData.copyPasteCode)
      .then(() => {
        setCopiedToClipboard(true);
        setTimeout(() => setCopiedToClipboard(false), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast({
          title: "Erro",
          description: "Não foi possível copiar o código PIX.",
          variant: "destructive",
        });
      });
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
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao confirmar seu pagamento. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
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

      {/* Client Information Collection Modal */}
      <Dialog open={showClientInfoModal} onOpenChange={setShowClientInfoModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Informações do Cliente</DialogTitle>
            <DialogDescription>
              Preencha seus dados para continuar com o pagamento
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="whatsappNumber" className="text-right font-medium col-span-1">
                WhatsApp:
              </label>
              <input
                id="whatsappNumber"
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="Com DDD (ex: 11999999999)"
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="clientName" className="text-right font-medium col-span-1">
                Nome:
              </label>
              <input
                id="clientName"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Seu nome completo"
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowClientInfoModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleProcessPayment} 
              className="bg-whatsapp hover:bg-whatsappDark text-white"
            >
              Continuar para Pagamento
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* PIX Payment Modal */}
      <Dialog open={showPixModal} onOpenChange={setShowPixModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pagamento via PIX</DialogTitle>
            <DialogDescription>
              Escaneie o QR code abaixo ou copie o código PIX para realizar o pagamento.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-6 py-4">
            <div className="qrcode-container bg-white p-4 rounded-lg border">
              {pixData && (
                <img 
                  src={pixData.qrCodeImage} 
                  alt="QR Code para pagamento PIX" 
                  className="w-48 h-48"
                />
              )}
            </div>
            
            <div className="w-full">
              <div className="text-sm font-medium mb-2">Código PIX para cópia:</div>
              <div className="flex">
                <div className="border rounded-l-md px-3 py-2 bg-gray-50 flex-grow text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                  {pixData?.copyPasteCode}
                </div>
                <Button 
                  variant="outline" 
                  className="rounded-l-none border-l-0" 
                  onClick={copyPIXCode}
                >
                  {copiedToClipboard ? "Copiado!" : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500 mb-2">
              Após realizar o pagamento, aguarde alguns segundos para a confirmação.
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowPixModal(false)}
              >
                Voltar
              </Button>
              <Button
                className="flex-1 bg-whatsapp hover:bg-whatsappDark text-white"
                onClick={handlePixPaymentConfirmed}
              >
                Já paguei
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PricingPlans;


import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get("payment_id");
  const status = queryParams.get("status");
  
  useEffect(() => {
    // In a real implementation, you would check the payment status with your backend
    console.log("Payment ID:", paymentId);
    console.log("Status:", status);
  }, [paymentId, status]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pagamento confirmado!</h1>
        <p className="text-gray-600 mb-6">
          Obrigado por assinar o UniZap CRM. Sua licença foi ativada com sucesso.
        </p>
        
        <div className="mb-8 py-4 px-6 bg-gray-50 rounded-lg text-left">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Número do pedido:</span>
            <span className="font-medium">{paymentId || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status:</span>
            <span className="font-medium text-green-500">{status || "Aprovado"}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button 
            className="w-full bg-whatsapp hover:bg-whatsappDark text-white"
            onClick={() => window.location.href = "https://app.unizap.com/"}
          >
            Acessar o UniZap CRM
          </Button>
          
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Voltar para a página inicial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;


import { CreditCard, Zap } from "lucide-react";

export type PaymentMethod = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onSelectMethod: (methodId: string) => void;
}

const paymentMethods: PaymentMethod[] = [
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

const PaymentMethodSelector = ({ selectedMethod, onSelectMethod }: PaymentMethodSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${
            selectedMethod === method.id
              ? "border-highlight bg-highlight/5"
              : "border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => onSelectMethod(method.id)}
        >
          <div className={`${selectedMethod === method.id ? "text-highlight" : "text-gray-400"}`}>
            {method.icon}
          </div>
          <div className="font-medium">{method.title}</div>
          {selectedMethod === method.id && (
            <div className="ml-auto w-5 h-5 rounded-full bg-highlight flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodSelector;
export { paymentMethods };

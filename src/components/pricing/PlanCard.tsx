
import { Button } from "@/components/ui/button";

type Plan = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  features: string[];
  color: string;
  popular: boolean;
};

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
}

const PlanCard = ({ plan, isSelected, onSelect }: PlanCardProps) => {
  return (
    <div 
      className={`pricing-card ${plan.color} ${isSelected ? "ring-2 ring-" + plan.color.replace("pricing-card-", "") : ""}`}
      onClick={() => onSelect(plan.id)}
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
          isSelected
            ? "bg-whatsapp hover:bg-whatsappDark text-white"
            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => onSelect(plan.id)}
      >
        {isSelected ? "Selecionado" : "Selecionar"}
      </Button>
    </div>
  );
};

export default PlanCard;

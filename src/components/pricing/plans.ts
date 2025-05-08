
export type Plan = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  features: string[];
  color: string;
  popular: boolean;
};

export const plans: Plan[] = [
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

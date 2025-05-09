
export interface Plan {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  features: string[];
  color: string;
  popular: boolean;
}

export interface ClientInfo {
  name: string;
  email: string;
  whatsapp: string;
}

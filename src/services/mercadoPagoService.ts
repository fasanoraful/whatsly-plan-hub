import { toast } from "sonner";

// Mercado Pago API types
interface MercadoPagoPreference {
  items: Array<{
    id: string;
    title: string;
    description?: string;
    picture_url?: string;
    category_id?: string;
    quantity: number;
    currency_id: string;
    unit_price: number;
  }>;
  payer?: {
    name?: string;
    email?: string;
    phone?: {
      area_code?: string;
      number?: string;
    };
  };
  back_urls?: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return?: string;
  payment_methods?: {
    excluded_payment_methods?: Array<{ id: string }>;
    excluded_payment_types?: Array<{ id: string }>;
    installments?: number;
  };
  notification_url?: string;
  statement_descriptor?: string;
  external_reference?: string;
  expires?: boolean;
  expiration_date_from?: string;
  expiration_date_to?: string;
}

interface MercadoPagoPaymentResponse {
  id: string;
  init_point: string; // URL for checkout
  sandbox_init_point: string;
  qr_code_base64?: string; // For PIX
  qr_code?: string; // URL for PIX QR code
  in_store_order_id?: string; // For PIX
  date_created: string;
  pix_copia_cola?: string; // For PIX copy/paste code
}

// Mercado Pago API integration
// In a real implementation, this would be handled by a backend service
// to keep API keys secure. Frontend would call backend endpoints.
export class MercadoPagoService {
  private static instance: MercadoPagoService;
  
  // This would normally be stored securely in backend environment variables
  // For demo purposes only - in production, never expose access tokens in frontend code
  private accessToken = 'TEST-8770184596010147-051115-3d048c307b4dff4cbd37657c1d592d37-1650709231';
  private apiUrl = 'https://api.mercadopago.com/checkout/preferences';
  
  private constructor() {}
  
  public static getInstance(): MercadoPagoService {
    if (!MercadoPagoService.instance) {
      MercadoPagoService.instance = new MercadoPagoService();
    }
    return MercadoPagoService.instance;
  }
  
  // Create a payment preference
  public async createPreference(planId: string, planTitle: string, price: number): Promise<MercadoPagoPaymentResponse | null> {
    try {
      const preference: MercadoPagoPreference = {
        items: [
          {
            id: planId,
            title: `UniZap CRM - Plano ${planTitle}`,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: price
          }
        ],
        back_urls: {
          success: 'https://site.com/sucesso',
          failure: 'https://site.com/falha',
          pending: 'https://site.com/pendente'
        },
        auto_return: 'approved',
        external_reference: `unizap-${planId}-${Date.now()}`
      };
      
      // In a real implementation, this request would be made to your backend
      // which would then use the Mercado Pago SDK to create the preference
      // For demo purposes, we're simulating the response
      console.log('Creating payment preference for:', planTitle, price);
      
      // Simulating API call response
      // In production, you would make a real API call:
      // const response = await fetch(this.apiUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${this.accessToken}`
      //   },
      //   body: JSON.stringify(preference)
      // });
      // const data = await response.json();
      
      // Mock response
      const mockResponse: MercadoPagoPaymentResponse = {
        id: `mock-${Date.now()}`,
        init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${Date.now()}`,
        sandbox_init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${Date.now()}&test=true`,
        date_created: new Date().toISOString(),
        qr_code_base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAA30lEQVR42uyYMRLCMAwEpU9j8v8n46SmYKLTShufKzNalfYUhWzf7fOzrQHQAGgANAAaAA2ABsB/APw+31vkBSAJQPAAyIdx7fiP9qS74g4APQWAygXApQIQRcDlAlBFANUBm90BygKWgh3gWZBbcHoALAXbh9MDlALoYXoArQGlk8MCVLvQbx8rQFuBKwDeClwBsJb4vgQyFuQWpBWA2ILUArwFYQUQW5BVAGML9hbEd0FUASgtwCsQKgBHC9AKhArAaeEzBLECeFr4DMGjAvBa+AyB+T1oADQAGgANgBeAH1zDvUdHj0GSAAAAAElFTkSuQmCC',
        pix_copia_cola: '00020101021126800014br.gov.bcb.pix2558pix.example.com/v2/9d36b84f-c70b-45f0-b92c-d1522b5aa5bb5204000053039865802BR5925UNIZAP TECNOLOGIA LTDA6008SAO PAULO62070503***6304E2CA'
      };
      
      return mockResponse;
    } catch (error) {
      console.error('Error creating payment preference:', error);
      toast.error("Erro ao processar pagamento. Por favor, tente novamente.");
      return null;
    }
  }
  
  // Generate PIX payment
  public async generatePixPayment(planId: string, planTitle: string, price: number): Promise<{ qrCodeImage: string, copyPasteCode: string } | null> {
    try {
      const preferenceResult = await this.createPreference(planId, planTitle, price);
      
      if (!preferenceResult) {
        throw new Error('Failed to create payment preference');
      }
      
      // In a real implementation, Mercado Pago would return the QR code image and copy/paste code
      return {
        qrCodeImage: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(preferenceResult.pix_copia_cola || '')}`,
        copyPasteCode: preferenceResult.pix_copia_cola || ''
      };
    } catch (error) {
      console.error('Error generating PIX payment:', error);
      toast.error("Erro ao gerar QR code PIX. Por favor, tente novamente.");
      return null;
    }
  }
  
  // Get Mercado Pago checkout URL for credit card payments
  public async getCreditCardCheckoutUrl(planId: string, planTitle: string, price: number): Promise<string | null> {
    try {
      const preferenceResult = await this.createPreference(planId, planTitle, price);
      
      if (!preferenceResult) {
        throw new Error('Failed to create payment preference');
      }
      
      // Use sandbox URL for testing, init_point for production
      return preferenceResult.sandbox_init_point || preferenceResult.init_point;
    } catch (error) {
      console.error('Error getting credit card checkout URL:', error);
      toast.error("Erro ao redirecionar para pagamento. Por favor, tente novamente.");
      return null;
    }
  }
}

export default MercadoPagoService.getInstance();

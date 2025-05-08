
import { toast } from "sonner";
import { License, createLicense } from "@/utils/dbConnection";

// Service to handle license creation after payment
export class LicenseService {
  private static instance: LicenseService;
  
  private constructor() {}
  
  public static getInstance(): LicenseService {
    if (!LicenseService.instance) {
      LicenseService.instance = new LicenseService();
    }
    return LicenseService.instance;
  }
  
  // Create a new license after successful payment
  public async createLicenseAfterPayment(
    planId: string, 
    whatsAppNumber: string, 
    clientName: string
  ): Promise<License | null> {
    try {
      // Determine license validity based on plan
      let validityDays = 0;
      
      switch (planId) {
        case 'monthly':
          validityDays = 30;
          break;
        case 'semiannual':
          validityDays = 180;
          break;
        case 'annual':
          validityDays = 365;
          break;
        default:
          validityDays = 30;
      }
      
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + validityDays);
      
      // Create license in database
      const licenseData: Omit<License, 'id' | 'license_key' | 'created_at' | 'status'> = {
        whatsapp_number: whatsAppNumber,
        client_name: clientName,
        validity_days: validityDays,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0]
      };
      
      const createdLicense = await createLicense(licenseData);
      
      if (createdLicense) {
        toast.success(`Licença criada com sucesso para ${clientName}`);
        return createdLicense;
      } else {
        throw new Error('Falha ao criar licença');
      }
    } catch (error) {
      console.error('Error creating license:', error);
      toast.error("Erro ao criar licença. Por favor, contate o suporte.");
      return null;
    }
  }
}

export default LicenseService.getInstance();

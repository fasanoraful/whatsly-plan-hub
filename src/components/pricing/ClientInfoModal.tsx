
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ClientInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  whatsappNumber: string;
  setWhatsappNumber: (value: string) => void;
  clientName: string;
  setClientName: (value: string) => void;
  onProcessPayment: () => void;
}

const ClientInfoModal = ({
  open,
  onOpenChange,
  whatsappNumber,
  setWhatsappNumber,
  clientName,
  setClientName,
  onProcessPayment,
}: ClientInfoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button 
            onClick={onProcessPayment} 
            className="bg-whatsapp hover:bg-whatsappDark text-white"
          >
            Continuar para Pagamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientInfoModal;

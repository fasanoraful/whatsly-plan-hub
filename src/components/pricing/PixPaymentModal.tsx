
import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface PixData {
  qrCodeImage: string;
  copyPasteCode: string;
}

interface PixPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pixData: PixData | null;
  onPaymentConfirmed: () => Promise<void>;
}

const PixPaymentModal = ({
  open,
  onOpenChange,
  pixData,
  onPaymentConfirmed,
}: PixPaymentModalProps) => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const copyPIXCode = () => {
    if (!pixData) return;
    
    navigator.clipboard.writeText(pixData.copyPasteCode)
      .then(() => {
        setCopiedToClipboard(true);
        setTimeout(() => setCopiedToClipboard(false), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast("Erro ao copiar o código PIX");
      });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onClick={() => onOpenChange(false)}
            >
              Voltar
            </Button>
            <Button
              className="flex-1 bg-whatsapp hover:bg-whatsappDark text-white"
              onClick={onPaymentConfirmed}
            >
              Já paguei
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PixPaymentModal;

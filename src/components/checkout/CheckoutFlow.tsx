import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Clock, Truck, CreditCard, Building2, Upload, CheckCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface CheckoutFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutFlow = ({ isOpen, onClose }: CheckoutFlowProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'delivery' | 'payment' | 'receipt'>('delivery');
  const [customerInfo, setCustomerInfo] = useState({ address: '', phone: '' });
  const [transferReceipt, setTransferReceipt] = useState<string | null>(null);

  const handleDeliveryConfirm = () => {
    if (!customerInfo.address || !customerInfo.phone) {
      toast.error('Please fill in your address and phone number');
      return;
    }
    setStep('payment');
  };

  const handlePayment = (method: string) => {
    if (method === 'KBZ Bank') {
      window.open('https://kpay.com.mm/', '_blank');
      toast.success('Opening KPay for secure bank transfer. Complete your payment there.');
      setStep('receipt');
    } else if (method === 'Yoma Bank') {
      window.open('https://yomabank.com/digital-banking', '_blank');
      toast.success('Opening Yoma Mobile Banking. Complete your payment there.');
      setStep('receipt');
    } else if (method === 'Credit Card') {
      window.open('https://stripe.com', '_blank');
      toast.success('Opening secure credit card payment. Complete your transaction there.');
      setStep('receipt');
    }
  };

  const handleReceiptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTransferReceipt(e.target?.result as string);
        toast.success('Transfer receipt uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReceipt = () => {
    if (!transferReceipt) {
      toast.error('Please upload your transfer receipt');
      return;
    }
    toast.success('Thank you! Your order has been submitted and is being processed.');
    clearCart();
    onClose();
    // Reset all states
    setStep('delivery');
    setCustomerInfo({ address: '', phone: '' });
    setTransferReceipt(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full p-8 max-h-[90vh] overflow-auto">
        {step === 'delivery' && (
          <div className="space-y-6">
            <div className="text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary">Delivery Information</h3>
              <p className="text-muted-foreground">Estimated delivery time: 1 week</p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="font-semibold">Royal Express Delivery</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Safe and trusted delivery partner
              </p>
              <button
                onClick={() => window.open('/delivery-rates.html', '_blank')}
                className="text-sm text-primary hover:underline cursor-pointer"
              >
                📋 View complete delivery rates →
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Delivery Address</label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                  placeholder="Enter your full delivery address..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your phone number..."
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button variant="hero" onClick={handleDeliveryConfirm} className="flex-1">
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary">Choose Payment Method</h3>
              <p className="text-muted-foreground">Total: {(totalPrice * 1000).toLocaleString()} MMK</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Bank Transfer
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handlePayment('KBZ Bank')}
                    className="p-4 border border-border rounded-lg hover:border-primary transition-smooth text-left"
                  >
                    <div className="font-medium">KBZ Bank</div>
                    <div className="text-sm text-muted-foreground">Account: 29130129100454601</div>
                  </button>
                  <button
                    onClick={() => handlePayment('Yoma Bank')}
                    className="p-4 border border-border rounded-lg hover:border-primary transition-smooth text-left"
                  >
                    <div className="font-medium">Yoma Bank</div>
                    <div className="text-sm text-muted-foreground">Account: 20008754009862101</div>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Credit Card
                </h4>
                <button
                  onClick={() => handlePayment('Credit Card')}
                  className="w-full p-4 border border-border rounded-lg hover:border-primary transition-smooth text-left"
                >
                  <div className="font-medium">Secure Credit Card Payment</div>
                  <div className="text-sm text-muted-foreground">Processed by Stripe</div>
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setStep('delivery')} className="flex-1">
                Back
              </Button>
            </div>
          </div>
        )}

        {step === 'receipt' && (
          <div className="space-y-6">
            <div className="text-center">
              <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary">Upload Transfer Receipt</h3>
              <p className="text-muted-foreground">Please upload your bank transfer receipt</p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleReceiptUpload}
                  className="hidden"
                  id="receipt-upload"
                />
                <label
                  htmlFor="receipt-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload receipt image
                  </span>
                </label>
              </div>

              {transferReceipt && (
                <div className="text-center">
                  <img
                    src={transferReceipt}
                    alt="Transfer Receipt"
                    className="max-w-full h-32 object-contain mx-auto rounded-lg"
                  />
                  <div className="flex items-center justify-center mt-2 text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Receipt uploaded successfully</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setStep('payment')} className="flex-1">
                Back
              </Button>
              <Button
                variant="hero"
                onClick={handleSubmitReceipt}
                className="flex-1"
                disabled={!transferReceipt}
              >
                Submit Order
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CheckoutFlow;
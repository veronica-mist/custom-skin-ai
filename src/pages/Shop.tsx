import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ShoppingCart, Package, Truck, CreditCard, Building2, Clock, CheckCircle, Star, Upload, Camera } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuthUser } from '@/components/auth/AuthGuard';
import shopBg from '@/assets/shop-bg.jpg';
import foundationBottles from '@/assets/foundation-bottles.jpg';

const Shop = () => {
  const location = useLocation();
  const scanResult = location.state?.scanResult;
  const { addItem } = useCart();
  const { user } = useAuthUser();
  
  const [selectedFinish, setSelectedFinish] = useState('matte');
  const [selectedCoverage, setSelectedCoverage] = useState('medium');
  const [selectedAdditives, setSelectedAdditives] = useState([]);
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showTransferReceipt, setShowTransferReceipt] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ address: '', phone: '' });
  const [transferReceipt, setTransferReceipt] = useState(null);

  const prices = {
    matte: 250000,
    dewy: 300000
  };

  const additiveOptions = [
    { name: 'Hyaluronic Acid', price: 15000 },
    { name: 'Vitamin E', price: 10000 },
    { name: 'SPF Protection', price: 20000 }
  ];

  const calculateTotal = () => {
    const basePrice = prices[selectedFinish];
    const additivesPrice = selectedAdditives.reduce((sum, additive) => 
      sum + (additiveOptions.find(opt => opt.name === additive)?.price || 0), 0
    );
    return basePrice + additivesPrice;
  };

  const handleAdditiveToggle = (additive) => {
    setSelectedAdditives(prev => 
      prev.includes(additive) 
        ? prev.filter(item => item !== additive)
        : [...prev, additive]
    );
  };

  const handleOrderNow = () => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      window.location.href = '/auth';
      return;
    }

    // Add to cart instead of going to delivery modal
    const cartItem = {
      productName: 'Custom Foundation',
      productDetails: {
        finish: selectedFinish,
        coverage: selectedCoverage,
        additives: selectedAdditives
      },
      quantity: 1,
      price: calculateTotal() / 1000 // Convert to USD for easier display
    };
    
    addItem(cartItem);
    
    // Reset selections for next order
    setSelectedFinish('matte');
    setSelectedCoverage('medium');
    setSelectedAdditives([]);
  };

  const handleDeliveryConfirm = () => {
    if (!customerInfo.address || !customerInfo.phone) {
      toast.error('Please fill in your address and phone number');
      return;
    }
    setShowDeliveryInfo(false);
    setShowPayment(true);
  };

  const handlePayment = (method) => {
    if (method === 'KBZ Bank') {
      // Open KPay app or website
      window.open('https://kpay.com.mm/', '_blank');
      toast.success('Opening KPay for secure bank transfer. Complete your payment there.');
      setShowPayment(false);
      setShowTransferReceipt(true);
    } else if (method === 'Yoma Bank') {
      // Open Yoma mobile banking
      window.open('https://yomabank.com/digital-banking', '_blank');
      toast.success('Opening Yoma Mobile Banking. Complete your payment there.');
      setShowPayment(false);
      setShowTransferReceipt(true);
    } else if (method === 'Credit Card') {
      // Open credit card payment processor
      window.open('https://stripe.com', '_blank');
      toast.success('Opening secure credit card payment. Complete your transaction there.');
    }
  };

  const handleReceiptUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTransferReceipt(e.target.result);
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
    setShowTransferReceipt(false);
    // Reset all states
    setSelectedFinish('matte');
    setSelectedCoverage('medium');
    setSelectedAdditives([]);
    setCustomerInfo({ address: '', phone: '' });
    setTransferReceipt(null);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section 
        className="relative py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${shopBg})`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Custom Foundation Shop
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Create your perfect foundation with personalized options
            </p>
          </div>
        </div>
      </section>

      {/* Foundation Builder */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Showcase */}
              <div className="space-y-8">
                <Card className="p-8 shadow-luxury">
                  <img 
                    src={foundationBottles} 
                    alt="Custom Foundation Bottles" 
                    className="w-full rounded-lg mb-6"
                  />
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-primary">Your Custom Foundation</h2>
                    {scanResult && (
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-sm">
                          Custom Code: {scanResult.customCode}
                        </Badge>
                        <p className="text-muted-foreground">
                          Matched for {scanResult.skinTone} skin with {scanResult.undertone} undertones
                        </p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Customer Reviews */}
                <Card className="p-6 gradient-luxury">
                  <h3 className="text-xl font-bold text-primary mb-4">What Customers Say</h3>
                  <div className="space-y-4">
                    <div className="bg-card/80 p-4 rounded-lg">
                      <div className="flex space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-luxury-gold fill-current" />
                        ))}
                      </div>
                      <p className="text-sm italic">"Perfect match! The matte finish lasts all day."</p>
                      <p className="text-xs text-muted-foreground mt-1">- Verified Customer</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Customization Options */}
              <div className="space-y-8">
                <Card className="p-8 shadow-luxury">
                  <h3 className="text-2xl font-bold text-primary mb-6">Customize Your Foundation</h3>
                  
                  {/* Finish Selection */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-lg font-semibold text-primary">Choose Finish</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setSelectedFinish('matte')}
                        className={`p-4 border-2 rounded-lg transition-smooth ${
                          selectedFinish === 'matte' 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="text-left">
                          <h5 className="font-semibold">Matte Finish</h5>
                          <p className="text-sm text-muted-foreground">Oil-free, long-lasting</p>
                          <p className="font-bold text-primary">250,000 MMK</p>
                        </div>
                      </button>
                      <button
                        onClick={() => setSelectedFinish('dewy')}
                        className={`p-4 border-2 rounded-lg transition-smooth ${
                          selectedFinish === 'dewy' 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="text-left">
                          <h5 className="font-semibold">Dewy Finish</h5>
                          <p className="text-sm text-muted-foreground">Hydrating, natural glow</p>
                          <p className="font-bold text-primary">300,000 MMK</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Coverage Selection */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-lg font-semibold text-primary">Coverage Level</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {['light', 'medium', 'full'].map((coverage) => (
                        <button
                          key={coverage}
                          onClick={() => setSelectedCoverage(coverage)}
                          className={`p-3 border-2 rounded-lg transition-smooth capitalize ${
                            selectedCoverage === coverage 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {coverage}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional Additives */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-lg font-semibold text-primary">Optional Skincare Additives</h4>
                    <div className="space-y-3">
                      {additiveOptions.map((additive) => (
                        <label key={additive.name} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAdditives.includes(additive.name)}
                            onChange={() => handleAdditiveToggle(additive.name)}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <span className="flex-1">{additive.name}</span>
                          <span className="font-semibold text-primary">+{additive.price.toLocaleString()} MMK</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-border pt-6 space-y-3">
                    <div className="flex justify-between">
                      <span>Base Price ({selectedFinish}):</span>
                      <span>{prices[selectedFinish].toLocaleString()} MMK</span>
                    </div>
                    {selectedAdditives.map((additive) => (
                      <div key={additive} className="flex justify-between text-sm">
                        <span>{additive}:</span>
                        <span>+{additiveOptions.find(opt => opt.name === additive)?.price.toLocaleString()} MMK</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-lg font-bold text-primary border-t pt-3">
                      <span>Total:</span>
                      <span>{calculateTotal().toLocaleString()} MMK</span>
                    </div>
                  </div>

                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full mt-6"
                    onClick={handleOrderNow}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Order Now
                  </Button>
                </Card>

                {/* Loyalty Program */}
                <Card className="p-6 gradient-luxury">
                  <h3 className="text-lg font-bold text-primary mb-3">
                    <Star className="h-5 w-5 inline mr-2" />
                    Loyalty Program
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Earn 1 point for every 2 purchases. Use 1 point to get 10% off your third purchase!
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Information Modal */}
      {showDeliveryInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-8">
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
                  onClick={() => window.open('/payment-info.html', '_blank')}
                  className="text-sm text-primary hover:underline cursor-pointer"
                >
                  📋 View complete payment & delivery information →
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
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeliveryInfo(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  variant="hero" 
                  onClick={handleDeliveryConfirm}
                  className="flex-1"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-8">
            <div className="space-y-6">
              <div className="text-center">
                <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-primary">Choose Payment Method</h3>
                <p className="text-muted-foreground">Total: {calculateTotal().toLocaleString()} MMK</p>
              </div>

              <div className="space-y-4">
                {/* Bank Transfer */}
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
                      <div className="text-sm text-muted-foreground">Account: 001845468003576</div>
                    </button>
                  </div>
                </div>

                {/* Credit Card */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Credit Card
                  </h4>
                  <button
                    onClick={() => handlePayment('Credit Card')}
                    className="w-full p-4 border border-border rounded-lg hover:border-primary transition-smooth text-left"
                  >
                    <div className="font-medium">Pay with Credit/Debit Card</div>
                    <div className="text-sm text-muted-foreground">Visa, Mastercard, etc.</div>
                  </button>
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={() => setShowPayment(false)}
                className="w-full"
              >
                Back
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Transfer Receipt Upload Modal */}
      {showTransferReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-8">
            <div className="space-y-6">
              <div className="text-center">
                <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-primary">Upload Transfer Receipt</h3>
                <p className="text-muted-foreground">Please upload your payment receipt to confirm your order</p>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {transferReceipt ? (
                    <div className="space-y-4">
                      <img 
                        src={transferReceipt} 
                        alt="Transfer Receipt" 
                        className="max-w-full h-48 object-contain mx-auto rounded-lg"
                      />
                      <p className="text-sm text-muted-foreground">Receipt uploaded successfully!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleReceiptUpload}
                          className="hidden"
                          id="receipt-upload"
                        />
                        <label
                          htmlFor="receipt-upload"
                          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-smooth"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Receipt Image
                        </label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Supported formats: JPG, PNG, GIF
                      </p>
                    </div>
                  )}
                </div>

                {transferReceipt && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Order Summary:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Total Amount:</span>
                        <span className="font-semibold">{calculateTotal().toLocaleString()} MMK</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Address:</span>
                        <span className="text-right max-w-32 truncate">{customerInfo.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span>{customerInfo.phone}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowTransferReceipt(false);
                    setShowPayment(true);
                  }}
                  className="flex-1"
                >
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
          </Card>
        </div>
      )}
    </div>
  );
};

export default Shop;
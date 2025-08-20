import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Card } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CheckoutFlow from '@/components/checkout/CheckoutFlow';

const CartSidebar = () => {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();
  
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button 
                variant="hero" 
                className="mt-4"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-primary">{item.productName}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {(item.price * 1000).toLocaleString()} MMK each
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {item.productDetails && (
                      <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                        <div className="space-y-1">
                          {item.productDetails.finish && (
                            <p>Finish: {item.productDetails.finish}</p>
                          )}
                          {item.productDetails.coverage && (
                            <p>Coverage: {item.productDetails.coverage}</p>
                          )}
                          {item.productDetails.additives && item.productDetails.additives.length > 0 && (
                            <p>Additives: {item.productDetails.additives.join(', ')}</p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-semibold">
                        {(item.price * item.quantity * 1000).toLocaleString()} MMK
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-primary">
                {(totalPrice * 1000).toLocaleString()} MMK
              </span>
            </div>

            <div className="space-y-2">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
      
      <CheckoutFlow 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
      />
    </Sheet>
  );
};

export default CartSidebar;
import { CreditCard, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { FormItem } from "./Shared";

export const PaymentForm = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
      <RadioGroup defaultValue="card" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <RadioGroupItem value="card" id="card" className="peer sr-only" />
          <Label htmlFor="card" className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-[#1e2575] [&:has([data-state=checked])]:border-[#1e2575] cursor-pointer transition-all">
            <CreditCard className="mb-3 h-6 w-6 text-gray-600" />
            <span className="font-semibold text-gray-900">Credit Card</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
          <Label htmlFor="paypal" className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-[#1e2575] [&:has([data-state=checked])]:border-[#1e2575] cursor-pointer transition-all">
            <Wallet className="mb-3 h-6 w-6 text-gray-600" />
            <span className="font-semibold text-gray-900">PayPal</span>
          </Label>
        </div>
      </RadioGroup>
    </div>

    <div className="space-y-6 border rounded-xl p-6 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900">Card Details</h3>
        <div className="flex gap-2">
          <div className="w-8 h-5 bg-gray-200 rounded"></div>
          <div className="w-8 h-5 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      <FormItem label="Card Number" id="cardNum">
        <div className="relative">
          <Input id="cardNum" placeholder="0000 0000 0000 0000" className="h-11 pl-11" />
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </FormItem>

      <div className="grid grid-cols-2 gap-4">
        <FormItem label="Expiration Date" id="expiry"><Input id="expiry" placeholder="MM/YY" className="h-11" /></FormItem>
        <FormItem label="CVC" id="cvc"><Input id="cvc" placeholder="123" className="h-11" /></FormItem>
      </div>

      <FormItem label="Card Holder Name" id="holder"><Input id="holder" placeholder="JONATHAN IVES" className="h-11" /></FormItem>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="billing" defaultChecked />
        <label htmlFor="billing" className="text-sm font-medium text-gray-600">Billing address same as shipping</label>
      </div>
    </div>
  </div>
);
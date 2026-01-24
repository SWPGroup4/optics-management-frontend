import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormItem } from "./Shared";
import { useCheckoutStore } from "../store/useCheckoutStore";

export const ShippingForm = () => {
  // Lấy data và hàm update từ Store
  const { shippingData, updateShippingData } = useCheckoutStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-gray-900">Shipping Details</h2>
      
      {/* Row 1: Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormItem label="First Name" id="firstName">
          <Input 
            id="firstName" 
            placeholder="e.g. Jonathan" 
            className="h-11"
            value={shippingData.firstName}
            onChange={(e) => updateShippingData({ firstName: e.target.value })}
          />
        </FormItem>
        <FormItem label="Last Name" id="lastName">
          <Input 
            id="lastName" 
            placeholder="e.g. Ives" 
            className="h-11"
            value={shippingData.lastName}
            onChange={(e) => updateShippingData({ lastName: e.target.value })}
          />
        </FormItem>
      </div>

      {/* Row 2: Address */}
      <FormItem label="Address" id="address">
        <Input 
          id="address" 
          placeholder="123 Design Blvd, Suite 400" 
          className="h-11"
          value={shippingData.address}
          onChange={(e) => updateShippingData({ address: e.target.value })}
        />
      </FormItem>

      {/* Row 3: City, State, Zip */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-6">
          <FormItem label="City" id="city">
            <Input 
              id="city" 
              placeholder="San Francisco" 
              className="h-11"
              value={shippingData.city}
              onChange={(e) => updateShippingData({ city: e.target.value })}
            />
          </FormItem>
        </div>
        
        <div className="sm:col-span-3">
          <FormItem label="State" id="state">
            {/* Lưu ý: Select của Shadcn dùng onValueChange chứ không phải onChange */}
            <Select 
              value={shippingData.state} 
              onValueChange={(value) => updateShippingData({ state: value })}
            >
              <SelectTrigger id="state" className="h-11">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ca">CA</SelectItem>
                <SelectItem value="ny">NY</SelectItem>
                <SelectItem value="tx">TX</SelectItem>
                <SelectItem value="wa">WA</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        </div>
        
        <div className="sm:col-span-3">
          <FormItem label="ZIP" id="zip">
            <Input 
              id="zip" 
              placeholder="94103" 
              className="h-11"
              value={shippingData.zip}
              onChange={(e) => updateShippingData({ zip: e.target.value })}
            />
          </FormItem>
        </div>
      </div>

      {/* Row 4: Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormItem label="Email" id="email">
          <Input 
            id="email" 
            type="email" 
            placeholder="jonathan@apple.com" 
            className="h-11"
            value={shippingData.email}
            onChange={(e) => updateShippingData({ email: e.target.value })}
          />
        </FormItem>
        <FormItem label="Phone" id="phone">
          <Input 
            id="phone" 
            type="tel" 
            placeholder="(555) 123-4567" 
            className="h-11"
            value={shippingData.phone}
            onChange={(e) => updateShippingData({ phone: e.target.value })}
          />
        </FormItem>
      </div>
    </div>
  );
};
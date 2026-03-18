import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Plus, Trash2, Tag, Package, Percent } from 'lucide-react';

interface LensPrice {
  id: string;
  type: string;
  index: string;
  basePrice: number;
  coating?: string;
}

interface Combo {
  id: string;
  name: string;
  items: string[];
  discount: number;
  active: boolean;
}

interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  usageCount: number;
  active: boolean;
}

const lensPrices: LensPrice[] = [
  { id: '1', type: 'Single Vision', index: '1.50', basePrice: 79 },
  { id: '2', type: 'Single Vision', index: '1.59 (Polycarbonate)', basePrice: 119 },
  { id: '3', type: 'Single Vision', index: '1.67 (High Index)', basePrice: 169 },
  { id: '4', type: 'Single Vision', index: '1.74 (Ultra High Index)', basePrice: 249 },
  { id: '5', type: 'Progressive', index: '1.50', basePrice: 199 },
  { id: '6', type: 'Progressive', index: '1.67 (High Index)', basePrice: 299 },
  { id: '7', type: 'Progressive', index: '1.74 (Ultra High Index)', basePrice: 399 },
  { id: '8', type: 'Bifocal', index: '1.50', basePrice: 149 },
];

const combos: Combo[] = [
  {
    id: '1',
    name: 'Complete Package',
    items: ['Any Frame', 'Single Vision Lens', 'Anti-Reflective Coating'],
    discount: 20,
    active: true,
  },
  {
    id: '2',
    name: 'Premium Bundle',
    items: ['Designer Frame', 'Progressive Lens 1.67', 'Blue Light Filter'],
    discount: 15,
    active: true,
  },
  {
    id: '3',
    name: 'Contact Lens Starter',
    items: ['Eye Exam', '3-Month Supply Contacts', 'Solution Kit'],
    discount: 25,
    active: false,
  },
];

const discountCodes: DiscountCode[] = [
  {
    id: '1',
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    minOrder: 100,
    usageCount: 145,
    active: true,
  },
  {
    id: '2',
    code: 'SAVE50',
    type: 'fixed',
    value: 50,
    minOrder: 200,
    usageCount: 67,
    active: true,
  },
  {
    id: '3',
    code: 'VIP30',
    type: 'percentage',
    value: 30,
    minOrder: 300,
    usageCount: 23,
    active: true,
  },
  {
    id: '4',
    code: 'FLASH15',
    type: 'percentage',
    value: 15,
    minOrder: 0,
    usageCount: 312,
    active: false,
  },
];

export default function Pricing() {
  return (
    <>
      <Tabs defaultValue="lenses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="lenses">Lens Pricing</TabsTrigger>
          <TabsTrigger value="combos">Combo Builder</TabsTrigger>
          <TabsTrigger value="discounts">Discount Codes</TabsTrigger>
        </TabsList>

        {/* Lens Pricing */}
        <TabsContent value="lenses" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Lens Price Matrix</h3>
              <p className="text-sm text-muted-foreground">
                Set base prices for different lens types and indices
              </p>
            </div>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Lens Type
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lens Type</TableHead>
                  <TableHead>Index</TableHead>
                  <TableHead className="w-[150px]">Base Price</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lensPrices.map((lens) => (
                  <TableRow key={lens.id}>
                    <TableCell className="font-medium">{lens.type}</TableCell>
                    <TableCell className="text-muted-foreground">{lens.index}</TableCell>
                    <TableCell>
                      <div className="relative w-24">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input type="number" defaultValue={lens.basePrice} className="pl-7 h-9" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Coatings Add-ons */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="font-semibold mb-4">Coating Add-ons</h4>
            <div className="grid grid-cols-4 gap-4">
              <div className="field-group">
                <Label className="text-sm text-muted-foreground">Anti-Reflective</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    +$
                  </span>
                  <Input type="number" defaultValue={39} className="pl-9" />
                </div>
              </div>
              <div className="field-group">
                <Label className="text-sm text-muted-foreground">Blue Light Filter</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    +$
                  </span>
                  <Input type="number" defaultValue={49} className="pl-9" />
                </div>
              </div>
              <div className="field-group">
                <Label className="text-sm text-muted-foreground">Photochromic</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    +$
                  </span>
                  <Input type="number" defaultValue={99} className="pl-9" />
                </div>
              </div>
              <div className="field-group">
                <Label className="text-sm text-muted-foreground">Scratch Resistant</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    +$
                  </span>
                  <Input type="number" defaultValue={29} className="pl-9" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Combo Builder */}
        <TabsContent value="combos" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Bundle Deals</h3>
              <p className="text-sm text-muted-foreground">
                Create product bundles with special discounts
              </p>
            </div>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Bundle
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {combos.map((combo) => (
              <div key={combo.id} className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-muted-foreground" />
                    <h4 className="font-semibold">{combo.name}</h4>
                  </div>
                  <Badge
                    variant={combo.active ? 'default' : 'secondary'}
                    className={
                      combo.active ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                    }
                  >
                    {combo.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <ul className="space-y-2 mb-4">
                  {combo.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-success" />
                    <span className="font-semibold text-success">{combo.discount}% OFF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={combo.active} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Discount Codes */}
        <TabsContent value="discounts" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Discount Codes</h3>
              <p className="text-sm text-muted-foreground">Create and manage promotional codes</p>
            </div>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Code
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Min. Order</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {discountCodes.map((code) => (
                  <TableRow key={code.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        <code className="font-mono font-medium bg-muted px-2 py-0.5 rounded">
                          {code.code}
                        </code>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground capitalize">{code.type}</TableCell>
                    <TableCell className="font-medium">
                      {code.type === 'percentage' ? `${code.value}%` : `$${code.value}`}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {code.minOrder > 0 ? `$${code.minOrder}` : 'None'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{code.usageCount} uses</TableCell>
                    <TableCell>
                      <Switch checked={code.active} />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

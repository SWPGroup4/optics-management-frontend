import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table.tsx";
import { Badge } from "../ui/badge.tsx";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select.tsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog.tsx";
import { Search, Filter, Eye, FileText } from "lucide-react";

interface Order {
    id: string;
    customer: string;
    email: string;
    type: "stock" | "preorder" | "prescription";
    status: "pending" | "rx_verification" | "lab_processing" | "shipped" | "completed";
    total: number;
    date: string;
    items: number;
    prescription?: {
        rightSphere: string;
        rightCylinder: string;
        rightAxis: string;
        leftSphere: string;
        leftCylinder: string;
        leftAxis: string;
        pd: string;
    };
}

const orders: Order[] = [
    {
        id: "ORD-2847",
        customer: "Emily Johnson",
        email: "emily.j@email.com",
        type: "prescription",
        status: "rx_verification",
        total: 489,
        date: "2024-01-15",
        items: 2,
        prescription: {
            rightSphere: "-2.50",
            rightCylinder: "-0.75",
            rightAxis: "180",
            leftSphere: "-2.25",
            leftCylinder: "-0.50",
            leftAxis: "175",
            pd: "63",
        },
    },
    {
        id: "ORD-2846",
        customer: "Michael Chen",
        email: "m.chen@email.com",
        type: "stock",
        status: "shipped",
        total: 154,
        date: "2024-01-15",
        items: 1,
    },
    {
        id: "ORD-2845",
        customer: "Sarah Williams",
        email: "sarah.w@email.com",
        type: "prescription",
        status: "lab_processing",
        total: 623,
        date: "2024-01-14",
        items: 3,
        prescription: {
            rightSphere: "-4.00",
            rightCylinder: "-1.25",
            rightAxis: "90",
            leftSphere: "-3.75",
            leftCylinder: "-1.00",
            leftAxis: "85",
            pd: "65",
        },
    },
    {
        id: "ORD-2844",
        customer: "James Miller",
        email: "j.miller@email.com",
        type: "preorder",
        status: "pending",
        total: 425,
        date: "2024-01-14",
        items: 1,
    },
    {
        id: "ORD-2843",
        customer: "Lisa Anderson",
        email: "lisa.a@email.com",
        type: "stock",
        status: "completed",
        total: 89,
        date: "2024-01-13",
        items: 1,
    },
    {
        id: "ORD-2842",
        customer: "David Brown",
        email: "d.brown@email.com",
        type: "prescription",
        status: "completed",
        total: 567,
        date: "2024-01-12",
        items: 2,
        prescription: {
            rightSphere: "+1.75",
            rightCylinder: "-0.25",
            rightAxis: "10",
            leftSphere: "+2.00",
            leftCylinder: "-0.25",
            leftAxis: "170",
            pd: "62",
        },
    },
];

const typeStyles = {
    stock: "bg-success/10 text-success border-success/20",
    preorder: "bg-info/10 text-info border-info/20",
    prescription: "bg-status-prescription/10 text-status-prescription border-status-prescription/20",
};

const statusStyles = {
    pending: "bg-warning/10 text-warning",
    rx_verification: "bg-status-prescription/10 text-status-prescription",
    lab_processing: "bg-info/10 text-info",
    shipped: "bg-muted text-foreground",
    completed: "bg-success/10 text-success",
};

const statusLabels = {
    pending: "Pending",
    rx_verification: "Rx Verification",
    lab_processing: "Lab Processing",
    shipped: "Shipped",
    completed: "Completed",
};

export function OrdersTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    // const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rx_verification">Rx Verification</SelectItem>
                        <SelectItem value="lab_processing">Lab Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead className="w-[140px]">Status</TableHead>
                            <TableHead className="w-[80px]">Items</TableHead>
                            <TableHead className="w-[100px]">Total</TableHead>
                            <TableHead className="w-[100px]">Date</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-mono text-sm font-medium">
                                    {order.id}
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{order.customer}</p>
                                        <p className="text-sm text-muted-foreground">{order.email}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={typeStyles[order.type]}>
                                        {order.type === "prescription" ? "Rx" : order.type}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className={statusStyles[order.status]}>
                                        {statusLabels[order.status]}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">{order.items}</TableCell>
                                <TableCell className="font-medium">${order.total}</TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                    {order.date}
                                </TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                // onClick={() => setSelectedOrder(order)}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-lg">
                                            <DialogHeader>
                                                <DialogTitle>Order {order.id}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Customer</p>
                                                        <p className="font-medium">{order.customer}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Email</p>
                                                        <p className="font-medium">{order.email}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Type</p>
                                                        <Badge variant="outline" className={typeStyles[order.type]}>
                                                            {order.type}
                                                        </Badge>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Status</p>
                                                        <Badge variant="secondary" className={statusStyles[order.status]}>
                                                            {statusLabels[order.status]}
                                                        </Badge>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Total</p>
                                                        <p className="font-medium text-lg">${order.total}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Date</p>
                                                        <p className="font-medium">{order.date}</p>
                                                    </div>
                                                </div>

                                                {order.prescription && (
                                                    <div className="border-t border-border pt-4">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <FileText className="w-4 h-4 text-muted-foreground" />
                                                            <h4 className="font-semibold">Prescription Data</h4>
                                                        </div>
                                                        <div className="bg-muted rounded-lg p-4">
                                                            <div className="grid grid-cols-4 gap-4 text-sm">
                                                                <div></div>
                                                                <div className="text-center font-medium text-muted-foreground">
                                                                    Sphere
                                                                </div>
                                                                <div className="text-center font-medium text-muted-foreground">
                                                                    Cylinder
                                                                </div>
                                                                <div className="text-center font-medium text-muted-foreground">
                                                                    Axis
                                                                </div>
                                                                <div className="font-medium">OD (Right)</div>
                                                                <div className="text-center font-mono">
                                                                    {order.prescription.rightSphere}
                                                                </div>
                                                                <div className="text-center font-mono">
                                                                    {order.prescription.rightCylinder}
                                                                </div>
                                                                <div className="text-center font-mono">
                                                                    {order.prescription.rightAxis}°
                                                                </div>
                                                                <div className="font-medium">OS (Left)</div>
                                                                <div className="text-center font-mono">
                                                                    {order.prescription.leftSphere}
                                                                </div>
                                                                <div className="text-center font-mono">
                                                                    {order.prescription.leftCylinder}
                                                                </div>
                                                                <div className="text-center font-mono">
                                                                    {order.prescription.leftAxis}°
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                                                                <span className="text-sm font-medium">PD (Pupillary Distance)</span>
                                                                <span className="font-mono">{order.prescription.pd}mm</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p>Showing {filteredOrders.length} of {orders.length} orders</p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

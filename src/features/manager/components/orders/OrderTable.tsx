import { useState, useEffect } from "react";
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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog.tsx";
import { Search, Filter, Eye, Loader2, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { useOrderStore } from "@/features/manager/stores/useOrderStore";
import type { Order } from "@/features/manager/api/order-api";

const typeStyles = {
    IN_STOCK: "bg-success/10 text-success border-success/20",
    PREORDER: "bg-info/10 text-info border-info/20",
    PRESCRIPTION: "bg-status-prescription/10 text-status-prescription border-status-prescription/20",
};

const statusStyles = {
    PENDING: "bg-warning/10 text-warning",
    ON_HOLD: "bg-status-hold/10 text-status-hold",
    CONFIRMED: "bg-info/10 text-info",
    PROCESSING: "bg-status-processing/10 text-status-processing",
    PRODUCED: "bg-success/10 text-success",
    SHIPPED: "bg-muted text-foreground",
    COMPLETED: "bg-success/10 text-success",
    CANCELLED: "bg-destructive/10 text-destructive",
};

const statusLabels = {
    PENDING: "Pending",
    ON_HOLD: "On Hold",
    CONFIRMED: "Confirmed",
    PROCESSING: "Processing",
    PRODUCED: "Produced",
    SHIPPED: "Shipped",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

const getOrderType = (order: Order): "IN_STOCK" | "PREORDER" | "PRESCRIPTION" => {
    const hasPrescription = order.items.some(item => item.prescription);
    if (hasPrescription) return "PRESCRIPTION";

    const hasPreorder = order.items.some(item => item.orderItemType === "PREORDER");
    if (hasPreorder) return "PREORDER";

    return "IN_STOCK";
};

export function OrdersTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const { orders, isLoading, error, fetchOrders, fetchOrderById, deleteOrder, filterByStatus } = useOrderStore();

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleStatusFilterChange = async (value: string) => {
        setStatusFilter(value);
        if (value === "all") {
            await fetchOrders();
        } else {
            await filterByStatus(value);
        }
    };

    const handleViewOrder = async (orderId: string) => {
        setDetailsLoading(true);
        try {
            const order = await fetchOrderById(orderId);
            setSelectedOrder(order);
        } finally {
            setDetailsLoading(false);
        }
    };

    const handleDeleteOrder = async (orderId: string) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await deleteOrder(orderId);
            } catch (error) {
                console.error("Error deleting order:", error);
            }
        }
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    if (error) {
        return (
            <div className="p-4 border border-destructive/20 bg-destructive/10 rounded-lg">
                <p className="text-destructive">Error: {error}</p>
                <Button onClick={fetchOrders} className="mt-2" variant="outline">
                    Retry
                </Button>
            </div>
        );
    }

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
                <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                    <SelectTrigger className="w-[180px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="ON_HOLD">On Hold</SelectItem>
                        <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                        <SelectItem value="PROCESSING">Processing</SelectItem>
                        <SelectItem value="PRODUCED">Produced</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="ml-2">Loading orders...</span>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead className="w-[120px]">Type</TableHead>
                                <TableHead className="w-[160px]">Status</TableHead>
                                <TableHead className="w-[80px]">Items</TableHead>
                                <TableHead className="w-[120px]">Total</TableHead>
                                <TableHead className="w-[120px]">Deposit</TableHead>
                                <TableHead className="w-[120px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => {
                                const orderType = getOrderType(order);
                                return (
                                    <TableRow key={order?.orderId}>
                                        <TableCell className="font-mono text-sm font-medium">
                                            {order?.orderId}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">#{order?.customerId}</p>
                                                <p className="text-sm text-muted-foreground">{order?.phoneNumber}</p>
                                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                    {order?.deliveryAddress}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={typeStyles[orderType]}>
                                                {orderType === "PRESCRIPTION" ? "Rx" : orderType?.replace("_", " ")}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={statusStyles[order.orderStatus]}>
                                                {statusLabels[order?.orderStatus]}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{order?.items?.length}</TableCell>
                                        <TableCell>${order?.totalAmount?.toFixed(2) ?? 0}</TableCell>
                                        <TableCell>${order?.depositAmount?.toFixed(2) ?? 0}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleViewOrder(order.orderId)}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteOrder(order.orderId)}
                                                    className="text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* Order Details Dialog */}
            <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                    </DialogHeader>
                    {detailsLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span className="ml-2">Loading order details...</span>
                        </div>
                    ) : selectedOrder ? (
                        <div className="space-y-6">
                            {/* Order Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Order ID</p>
                                    <p className="font-medium">{selectedOrder?.orderId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Customer ID</p>
                                    <p className="font-medium">#{selectedOrder?.customerId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone Number</p>
                                    <p className="font-medium">{selectedOrder?.phoneNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Delivery Address</p>
                                    <p className="font-medium text-sm">{selectedOrder?.deliveryAddress}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Order Status</p>
                                    <Badge variant="secondary" className={statusStyles[selectedOrder?.orderStatus]}>
                                        {statusLabels[selectedOrder?.orderStatus]}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Amount</p>
                                    <p className="font-medium">${selectedOrder?.totalAmount?.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Deposit Amount</p>
                                    <p className="font-medium">${selectedOrder?.depositAmount?.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Balance</p>
                                    <p className="font-medium">${(selectedOrder?.totalAmount - selectedOrder?.depositAmount)?.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Items */}
                            <div>
                                <h4 className="font-medium mb-3">Order Items ({selectedOrder?.items?.length})</h4>
                                <div className="space-y-3">
                                    {selectedOrder.items?.map((item) => (
                                        <div key={item.productVariantId} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <span className="font-medium">Variant: {item.productVariantId}</span>
                                                    <div className="flex gap-2 mt-1">
                                                        <Badge variant="outline">
                                                            {item.orderItemType?.replace("_", " ")}
                                                        </Badge>
                                                        <Badge variant="secondary">
                                                            {item.status?.replace("_", " ")}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">${item?.totalPrice?.toFixed(2)}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        ${item?.unitPrice?.toFixed(2)} × {item?.quantity}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Prescription Details */}
                                            {item.prescription && (
                                                <div className="mt-4 space-y-3 border-t pt-3">
                                                    <h5 className="text-sm font-medium text-muted-foreground">Prescription Details</h5>
                                                    <div className="grid grid-cols-2 gap-6 text-sm">
                                                        <div>
                                                            <p className="font-medium text-muted-foreground mb-2">Right Eye (OD)</p>
                                                            <div className="space-y-1">
                                                                <p>Sphere: {item?.prescription?.odSphere.toFixed(2)}</p>
                                                                <p>Cylinder: {item?.prescription?.odCylinder.toFixed(2)}</p>
                                                                <p>Axis: {item?.prescription?.odAxis}°</p>
                                                                <p>Add: {item?.prescription?.odAdd.toFixed(2)}</p>
                                                                <p>PD: {item?.prescription?.odPd.toFixed(1)}mm</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-muted-foreground mb-2">Left Eye (OS)</p>
                                                            <div className="space-y-1">
                                                                <p>Sphere: {item?.prescription?.osSphere.toFixed(2)}</p>
                                                                <p>Cylinder: {item?.prescription?.osCylinder.toFixed(2)}</p>
                                                                <p>Axis: {item?.prescription?.osAxis}°</p>
                                                                <p>Add: {item?.prescription?.osAdd?.toFixed(2)}</p>
                                                                <p>PD: {item?.prescription?.osPd?.toFixed(1)}mm</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {item?.prescription?.note && (
                                                        <div className="mt-2">
                                                            <p className="text-sm text-muted-foreground">Notes:</p>
                                                            <p className="text-sm">{item?.prescription?.note}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </DialogContent>
            </Dialog>
        </div>
    );
}
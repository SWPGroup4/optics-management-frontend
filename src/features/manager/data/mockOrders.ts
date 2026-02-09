import type { Order } from "@/features/manager/api/order-api";

export const mockOrders: Order[] = [
    {
        customerId: "CUST-001",
        orderId: "ORD-001",
        deliveryAddress: "123 Main St, New York, NY 10001",
        phoneNumber: "+1-555-0101",
        orderStatus: "PENDING",
        totalAmount: 289.99,
        depositAmount: 50.00,
        items: [
            {
                productVariantId: "PV-001",
                orderItemType: "IN_STOCK",
                quantity: 1,
                unitPrice: 289.99,
                totalPrice: 289.99,
                status: "PENDING"
            }
        ]
    },
    {
        customerId: "CUST-002",
        orderId: "ORD-002",
        deliveryAddress: "456 Oak Ave, Los Angeles, CA 90001",
        phoneNumber: "+1-555-0102",
        orderStatus: "ON_HOLD",
        totalAmount: 567.50,
        depositAmount: 100.00,
        items: [
            {
                productVariantId: "PV-002",
                orderItemType: "IN_STOCK",
                quantity: 1,
                unitPrice: 567.50,
                totalPrice: 567.50,
                status: "IN_PRODUCTION",
                prescription: {
                    id: "RX-001",
                    odSphere: -2.50,
                    odCylinder: -0.75,
                    odAxis: 180,
                    odAdd: 0.00,
                    odPd: 63.0,
                    osSphere: -2.25,
                    osCylinder: -0.50,
                    osAxis: 175,
                    osAdd: 0.00,
                    osPd: 63.0,
                    note: "Regular prescription glasses"
                }
            }
        ]
    },
    {
        customerId: "CUST-003",
        orderId: "ORD-003",
        deliveryAddress: "789 Pine Rd, Chicago, IL 60601",
        phoneNumber: "+1-555-0103",
        orderStatus: "PROCESSING",
        totalAmount: 845.00,
        depositAmount: 150.00,
        items: [
            {
                productVariantId: "PV-003",
                orderItemType: "PREORDER",
                quantity: 1,
                unitPrice: 425.00,
                totalPrice: 425.00,
                status: "IN_PRODUCTION"
            },
            {
                productVariantId: "PV-004",
                orderItemType: "IN_STOCK",
                quantity: 1,
                unitPrice: 420.00,
                totalPrice: 420.00,
                status: "IN_PRODUCTION",
                prescription: {
                    id: "RX-002",
                    odSphere: -4.00,
                    odCylinder: -1.25,
                    odAxis: 90,
                    odAdd: 0.25,
                    odPd: 65.0,
                    osSphere: -3.75,
                    osCylinder: -1.00,
                    osAxis: 85,
                    osAdd: 0.25,
                    osPd: 65.0,
                    note: "Progressive lenses with anti-glare coating"
                }
            }
        ]
    },
    {
        customerId: "CUST-004",
        orderId: "ORD-004",
        deliveryAddress: "321 Elm St, Houston, TX 77001",
        phoneNumber: "+1-555-0104",
        orderStatus: "SHIPPED",
        totalAmount: 425.75,
        depositAmount: 75.00,
        items: [
            {
                productVariantId: "PV-005",
                orderItemType: "PREORDER",
                quantity: 1,
                unitPrice: 425.75,
                totalPrice: 425.75,
                status: "COMPLETED"
            }
        ]
    },
    {
        customerId: "CUST-005",
        orderId: "ORD-005",
        deliveryAddress: "654 Maple Dr, Phoenix, AZ 85001",
        phoneNumber: "+1-555-0105",
        orderStatus: "COMPLETED",
        totalAmount: 189.99,
        depositAmount: 25.00,
        items: [
            {
                productVariantId: "PV-006",
                orderItemType: "IN_STOCK",
                quantity: 1,
                unitPrice: 189.99,
                totalPrice: 189.99,
                status: "COMPLETED"
            }
        ]
    },
    {
        customerId: "CUST-006",
        orderId: "ORD-006",
        deliveryAddress: "987 Cedar Ln, Philadelphia, PA 19101",
        phoneNumber: "+1-555-0106",
        orderStatus: "PENDING",
        totalAmount: 723.50,
        depositAmount: 125.00,
        items: [
            {
                productVariantId: "PV-007",
                orderItemType: "IN_STOCK",
                quantity: 1,
                unitPrice: 361.75,
                totalPrice: 361.75,
                status: "PENDING",
                prescription: {
                    id: "RX-003",
                    odSphere: 1.75,
                    odCylinder: -0.25,
                    odAxis: 10,
                    odAdd: 0.00,
                    odPd: 62.0,
                    osSphere: 2.00,
                    osCylinder: -0.25,
                    osAxis: 170,
                    osAdd: 0.00,
                    osPd: 62.0,
                    note: "Single vision glasses"
                }
            },
            {
                productVariantId: "PV-008",
                orderItemType: "IN_STOCK",
                quantity: 1,
                unitPrice: 361.75,
                totalPrice: 361.75,
                status: "PENDING",
                prescription: {
                    id: "RX-004",
                    odSphere: 1.50,
                    odCylinder: -0.50,
                    odAxis: 15,
                    odAdd: 0.00,
                    odPd: 62.0,
                    osSphere: 1.75,
                    osCylinder: -0.25,
                    osAxis: 165,
                    osAdd: 0.00,
                    osPd: 62.0,
                    note: "Backup pair"
                }
            }
        ]
    },
    {
        customerId: "CUST-007",
        orderId: "ORD-007",
        deliveryAddress: "147 Birch St, San Antonio, TX 78201",
        phoneNumber: "+1-555-0107",
        orderStatus: "ON_HOLD",
        totalAmount: 356.25,
        depositAmount: 60.00,
        items: [
            {
                productVariantId: "PV-009",
                orderItemType: "PREORDER",
                quantity: 1,
                unitPrice: 356.25,
                totalPrice: 356.25,
                status: "IN_PRODUCTION",
                prescription: {
                    id: "RX-005",
                    odSphere: -3.25,
                    odCylinder: -0.75,
                    odAxis: 45,
                    odAdd: 0.00,
                    odPd: 64.0,
                    osSphere: -3.00,
                    osCylinder: -0.50,
                    osAxis: 40,
                    osAdd: 0.00,
                    osPd: 64.0,
                    note: "Bifocal glasses"
                }
            }
        ]
    },
    {
        customerId: "CUST-008",
        orderId: "ORD-008",
        deliveryAddress: "258 Spruce Way, San Diego, CA 92101",
        phoneNumber: "+1-555-0108",
        orderStatus: "PROCESSING",
        totalAmount: 912.00,
        depositAmount: 175.00,
        items: [
            {
                productVariantId: "PV-010",
                orderItemType: "IN_STOCK",
                quantity: 1,
                unitPrice: 200.00,
                totalPrice: 200.00,
                status: "IN_PRODUCTION"
            },
            {
                productVariantId: "PV-011",
                orderItemType: "IN_STOCK",
                quantity: 1,
                unitPrice: 512.00,
                totalPrice: 512.00,
                status: "IN_PRODUCTION",
                prescription: {
                    id: "RX-006",
                    odSphere: -5.50,
                    odCylinder: -2.00,
                    odAxis: 120,
                    odAdd: 0.50,
                    odPd: 66.0,
                    osSphere: -5.25,
                    osCylinder: -1.75,
                    osAxis: 115,
                    osAdd: 0.50,
                    osPd: 66.0,
                    note: "High prescription with progressive lenses"
                }
            },
            {
                productVariantId: "PV-012",
                orderItemType: "PREORDER",
                quantity: 1,
                unitPrice: 200.00,
                totalPrice: 200.00,
                status: "IN_PRODUCTION"
            }
        ]
    },
    {
        customerId: "CUST-009",
        orderId: "ORD-009",
        deliveryAddress: "369 Willow Blvd, Dallas, TX 75201",
        phoneNumber: "+1-555-0109",
        orderStatus: "SHIPPED",
        totalAmount: 234.99,
        depositAmount: 40.00,
        items: [
            {
                productVariantId: "PV-013",
                orderItemType: "IN_STOCK",
                quantity: 1,
                unitPrice: 234.99,
                totalPrice: 234.99,
                status: "COMPLETED"
            }
        ]
    },
    {
        customerId: "CUST-010",
        orderId: "ORD-010",
        deliveryAddress: "741 Aspen Ave, San Jose, CA 95101",
        phoneNumber: "+1-555-0110",
        orderStatus: "COMPLETED",
        totalAmount: 1567.75,
        depositAmount: 300.00,
        items: [
            {
                productVariantId: "PV-014",
                orderItemType: "IN_STOCK",
                quantity: 1,
                unitPrice: 525.00,
                totalPrice: 525.00,
                status: "COMPLETED",
                prescription: {
                    id: "RX-007",
                    odSphere: -6.00,
                    odCylinder: -2.50,
                    odAxis: 80,
                    odAdd: 0.75,
                    odPd: 67.0,
                    osSphere: -5.75,
                    osCylinder: -2.25,
                    osAxis: 75,
                    osAdd: 0.75,
                    osPd: 67.0,
                    note: "Very high prescription with premium progressive lenses"
                }
            },
            {
                productVariantId: "PV-015",
                orderItemType: "IN_STOCK",
                quantity: 1,
                unitPrice: 542.75,
                totalPrice: 542.75,
                status: "COMPLETED",
                prescription: {
                    id: "RX-008",
                    odSphere: -5.75,
                    odCylinder: -2.25,
                    odAxis: 85,
                    odAdd: 0.75,
                    odPd: 67.0,
                    osSphere: -5.50,
                    osCylinder: -2.00,
                    osAxis: 80,
                    osAdd: 0.75,
                    osPd: 67.0,
                    note: "Second pair with same prescription"
                }
            },
            {
                productVariantId: "PV-016",
                orderItemType: "PREORDER",
                quantity: 1,
                unitPrice: 500.00,
                totalPrice: 500.00,
                status: "COMPLETED"
            }
        ]
    }
];
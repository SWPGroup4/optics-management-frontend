import React from 'react';
// import { Glasses, Eye } from 'lucide-react';
import type { Order, OrderDetail } from '@/features/operation-staff/types/types';
import { useOrderDrawerStore } from '@/features/operation-staff/store/orderDrawerStore.ts';
// import { mockOrderDetails } from '@/features/manager/data/mockOrderDetails';

interface OrderRowProps {
  order: Order;
  isSelected: boolean;
  onSelectionChange: (orderId: string, selected: boolean) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({ order, isSelected, onSelectionChange }) => {
  const { openDrawer } = useOrderDrawerStore();

  const handleProcessOrder = () => {
    if (order) {
      const orderDetail: OrderDetail = {
        ...order,
        receivedTime: new Date().toISOString(),
        pickingItems: [],
        prescription: {
          od: { sphere: 0, cylinder: 0, axis: 0, pd: 0 },
          os: { sphere: 0, cylinder: 0, axis: 0, pd: 0 },
        },
        salesNotes: [],
        processingStatus: 'pending' as const,
      };
      openDrawer(orderDetail);
    }
  };

  const getPriorityStyles = () => {
    switch (order.priority) {
      case 'high':
        return 'hover:bg-red-50/30 dark:hover:bg-red-900/10';
      default:
        return 'hover:bg-slate-50 dark:hover:bg-slate-800/50';
    }
  };

  // const getSlaStyles = () => {
  //     if (order.slaHours <= 2) {
  //         return 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800';
  //     } else if (order.slaHours <= 5) {
  //         return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-100 dark:border-yellow-800';
  //     } else {
  //         return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800';
  //     }
  // };
  //
  // const getPaymentStyles = () => {
  //     switch (order.paymentStatus) {
  //         case 'deposit_50':
  //             return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-100 dark:border-blue-800';
  //         case 'full_payment':
  //             return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800';
  //         default:
  //             return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-600';
  //     }
  // };

  const getStatusStyles = () => {
    switch (order.status) {
      case 'PROCESSING':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-100 dark:border-blue-800';
      case 'PRODUCED':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-600';
    }
  };

  // const getPaymentText = () => {
  //     switch (order.paymentStatus) {
  //         case 'deposit_50': return 'Đã cọc 50%';
  //         case 'full_payment': return 'Đã Full';
  //         default: return 'Chưa TT';
  //     }
  // };

  // const getSlaDotColor = () => {
  //     if (order.slaHours <= 2) return 'bg-red-500 animate-pulse';
  //     if (order.slaHours <= 5) return 'bg-yellow-500';
  //     return 'bg-emerald-500';
  // };

  // const getProductIcon = () => {
  //     switch (order.productIcon) {
  //         case 'visibility':
  //             return <Eye className="w-5 h-5" />;
  //         default:
  //             return <Glasses className="w-5 h-5" />;
  //     }
  // };

  const getStatus = () => {
    switch (order.status) {
      case 'PENDING':
        return 'Đang chờ';
      case 'PROCESSING':
        return 'Đang xử lý';
      case 'PRODUCED':
        return 'Đã xử lý';
      default:
        return 'Đang chờ';
    }
  };

  return (
    <tr className={`group ${getPriorityStyles()} transition-colors`}>
      <td className="px-6 py-4 align-middle">
        <input
          checked={isSelected}
          onChange={(e) => onSelectionChange(order.id, e.target.checked)}
          className="rounded border-slate-300 text-primary focus:ring-primary/20 bg-white dark:bg-slate-700 dark:border-slate-600"
          type="checkbox"
        />
      </td>

      <td className="px-6 py-4 align-middle">
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 dark:text-white">{order.orderCode}</span>
          <span className="text-xs text-slate-500">Khách: {order.customerName}</span>
        </div>
      </td>

      {/*<td className="px-6 py-4 align-middle">*/}
      {/*    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${getSlaStyles()}`}>*/}
      {/*        <span className={`w-2 h-2 rounded-full ${getSlaDotColor()}`}></span>*/}
      {/*        <span className="text-xs font-bold">{order.sla}</span>*/}
      {/*    </div>*/}
      {/*</td>*/}

      {/*<td className="px-6 py-4 align-middle">*/}
      {/*    <div className="flex items-center gap-3">*/}
      {/*        <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400">*/}
      {/*            {getProductIcon()}*/}
      {/*        </div>*/}
      {/*        <div className="flex flex-col">*/}
      {/*            <span className="font-medium text-slate-900 dark:text-white">{order.productName}</span>*/}
      {/*            <span className="text-xs text-slate-500">{order.productType}</span>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</td>*/}

      <td className="px-6 py-4 align-middle">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}
        >
          {getStatus()}
        </span>
      </td>

      <td className="px-6 py-4 align-middle text-right">
        <button
          disabled={!order.isActionable}
          onClick={handleProcessOrder}
          className={`inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-lg transition-colors shadow-sm ${
            order.isActionable
              ? order.priority === 'high'
                ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
                : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-transparent'
          }`}
        >
          Xử lý ngay
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;

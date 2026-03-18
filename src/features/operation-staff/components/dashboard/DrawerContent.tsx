import React from 'react';
import PickingListSection from './PickingListSection';
// import PrescriptionSection from './PrescriptionSection';
import SalesNotesSection from './SalesNotesSection';
import type { OrderDetail } from '@/features/operation-staff/types/types';

interface DrawerContentProps {
  order: OrderDetail;
  isOpen: boolean;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ order, isOpen }) => {
  return (
    <div
      className={`flex-1 overflow-y-auto no-scrollbar p-6 md:p-8 space-y-8 bg-white dark:bg-[#1a262d] transition-all duration-500 delay-150 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <PickingListSection items={order.pickingItems} />
      {/*<PrescriptionSection prescription={order.prescription} />*/}
      <SalesNotesSection notes={order.salesNotes} />
    </div>
  );
};

export default DrawerContent;

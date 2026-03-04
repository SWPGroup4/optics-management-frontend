import React from 'react';
import { CheckCircle } from 'lucide-react';

interface DrawerFooterProps {
    onReportError: () => void;
    onCompleteProcessing: () => void;
    isProcessing?: boolean;
}

const DrawerFooter: React.FC<DrawerFooterProps> = ({
                                                       onReportError,
                                                       onCompleteProcessing,
                                                       isProcessing = false
                                                   }) => {
    return (
        <footer className="flex-none p-6 bg-white dark:bg-[#1a2e22] border-t border-slate-200 dark:border-slate-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-30">
            <div className="flex flex-col md:flex-row gap-4 h-14">
                <button
                    onClick={onReportError}
                    className="flex-1 md:flex-[1] flex items-center justify-center gap-2 rounded-lg border-2 border-red-200 hover:border-red-500 text-red-600 hover:text-red-700 dark:text-red-400 dark:border-red-900 font-bold transition-all uppercase tracking-wide hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    Bắt đầu xử lý
                </button>

                <button
                    onClick={onCompleteProcessing}
                    disabled={isProcessing}
                    className="flex-1 md:flex-[2] flex items-center justify-center gap-3 rounded-lg bg-white border-2 border-[#25d36b] hover:bg-[#25d36b] text-[#102217] font-black text-lg shadow-lg hover:shadow-xl transition-all uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <CheckCircle className="w-6 h-6 font-bold" />
                    Hoàn tất
                </button>
            </div>
        </footer>
    );
};

export default DrawerFooter;
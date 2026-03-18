import React from 'react';
import type {BEPrescription} from '@/features/operation-staff/types/types';

interface PrescriptionSectionProps {
    prescription: BEPrescription;
}

const PrescriptionSection: React.FC<PrescriptionSectionProps> = ({prescription}) => {
    return (
        <section>
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm text-slate-600 dark:text-slate-400">
                    Thông số kỹ thuật:
                </h3>
            </div>

            <div
                className="bg-white dark:bg-[#1a2e22] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-center">
                        <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-[10%]">Mắt</th>
                            <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-[18%]">SPH
                                (Cầu)
                            </th>
                            <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-[18%]">CYL
                                (Loạn)
                            </th>
                            <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-[18%]">AXIS
                                (Trục)
                            </th>
                            <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-[18%]">ADD</th>
                            <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-[18%]">PD
                                (KC)
                            </th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {/* Row OD (Right) */}
                        <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-6 px-4">
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">OD</span>
                                    <span className="text-xs font-bold text-slate-400">Phải</span>
                                </div>
                            </td>
                            <td className="py-6 px-4">
                              <span
                                  className="font-mono text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">
                                {prescription?.odSphere >= 0 ? '+' : ''}{prescription?.odSphere?.toFixed(2) || 0}
                              </span>
                            </td>
                            <td className="py-6 px-4">
                              <span
                                  className="font-mono text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">
                                {prescription?.odCylinder >= 0 ? '+' : ''}{prescription?.odCylinder.toFixed(2) || 0}
                              </span>
                            </td>
                            <td className="py-6 px-4">
                              <span
                                  className="font-mono text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter text-blue-600 dark:text-blue-400">
                                {prescription?.odAxis || 0}
                              </span>
                            </td>
                            <td className="py-6 px-4">
                              <span
                                  className="font-mono text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter text-green-600 dark:text-green-400">
                                {prescription?.odAdd >= 0 ? '+' : ''}{prescription?.odAdd?.toFixed(2) || 0}
                              </span>
                            </td>
                            <td className="py-6 px-4 bg-slate-50/50 dark:bg-slate-800/20">
                              <span
                                  className="font-mono text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300 tracking-tighter">
                                {prescription?.odPd || 0}
                              </span>
                            </td>
                        </tr>

                        {/* Row OS (Left) */}
                        <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors bg-slate-50/30 dark:bg-slate-800/10">
                            <td className="py-6 px-4">
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">OS</span>
                                    <span className="text-xs font-bold text-slate-400">Trái</span>
                                </div>
                            </td>
                            <td className="py-6 px-4">
                                <span
                                    className="font-mono text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">
                                    {prescription?.osSphere >= 0 ? '+' : ''}{prescription?.osSphere?.toFixed(2) || 0}
                                </span>
                            </td>
                            <td className="py-6 px-4">
                               <span
                                   className="font-mono text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">
                                  {prescription?.osCylinder >= 0 ? '+' : ''}{prescription?.osCylinder?.toFixed(2) || 0}
                               </span>
                            </td>
                            <td className="py-6 px-4">
                                <span
                                    className="font-mono text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">
                                    {prescription?.osAxis || 0}
                                </span>
                            </td>
                            <td className="py-6 px-4">
                                <span
                                    className="font-mono text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter text-green-600 dark:text-green-400">
                                    {prescription?.osAdd >= 0 ? '+' : ''}{prescription?.osAdd?.toFixed(2) || 0}
                                </span>
                            </td>
                            <td className="py-6 px-4 bg-slate-50/50 dark:bg-slate-800/20">
                              <span
                                  className="font-mono text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300 tracking-tighter">
                                  {prescription?.osPd || 0}
                              </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default PrescriptionSection;
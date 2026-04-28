'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Database, Fingerprint, Shield, History, ArrowRight, ExternalLink, Cpu, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const ledgerData = [
  { id: 'TX-829', media: 'Man City vs Liverpool - Goal', duration: '03:42', type: 'Clip', timestamp: '2024-04-28 14:20:11', status: 'MINTED', owner: 'EPL Official' },
  { id: 'TX-821', media: 'NBA Finals Opening Ceremony', duration: '12:05', type: 'Stream', timestamp: '2024-04-28 14:15:00', status: 'MINTED', owner: 'NBA Digital' },
  { id: 'TX-815', media: 'Champions League Quarter Final', duration: '45:00', type: 'Live', timestamp: '2024-04-28 14:02:44', status: 'MINTED', owner: 'UEFA Hub' },
  { id: 'TX-808', media: 'Wimbledon Center Court Feed', duration: '02:00', type: 'Loop', timestamp: '2024-04-28 13:55:12', status: 'VERIFIED', owner: 'All England Club' },
  { id: 'TX-799', media: 'Formula 1 Paddock Highlights', duration: '05:30', type: 'Replay', timestamp: '2024-04-28 13:40:02', status: 'MINTED', owner: 'F1 Media' },
];

import { useProvenanceRecords } from '@/lib/hooks';

export default function ExplorerPage() {
  const { records, loading } = useProvenanceRecords();

  return (
    <DashboardLayout>
      <div className="space-y-12">
        <div className="flex justify-between items-end border-b border-white/5 pb-6">
          <div>
            <h2 className="text-4xl heading-italic">Provenance Explorer</h2>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-1">Immutable Ledger • GCP Blockchain Node</p>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded flex items-center gap-4">
              <Cpu className="w-5 h-5 text-brand-cyan" />
              <div>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest font-black leading-none mb-1">Active Block</p>
                <p className="text-sm font-black font-mono text-white">#9,281,042</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel rounded-2xl overflow-hidden border-white/10">
              <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <History className="w-4 h-4 text-brand-cyan" />
                  Broadcast Transaction History
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-black/40">
                      <th className="px-8 py-4 font-black">Ledger ID</th>
                      <th className="px-4 py-4 font-black">Media Asset</th>
                      <th className="px-4 py-4 font-black">Type</th>
                      <th className="px-4 py-4 font-black">Owner</th>
                      <th className="px-4 py-4 font-black text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      [1,2,3,4].map(i => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={5} className="px-8 py-8 h-12 bg-white/[0.01]" />
                        </tr>
                      ))
                    ) : records.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-24 text-center">
                          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600">No Transactions Located</p>
                        </td>
                      </tr>
                    ) : (
                      records.map((tx, i) => (
                        <motion.tr 
                          key={tx.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="group hover:bg-brand-cyan/[0.02] transition-colors cursor-pointer border-l-2 border-transparent hover:border-brand-cyan"
                        >
                          <td className="px-8 py-6 text-xs font-mono text-brand-cyan group-hover:underline font-black italic">
                            {(tx.blockchainTx || tx.id).slice(0, 12)}...
                          </td>
                          <td className="px-4 py-6">
                             <p className="text-sm font-black uppercase italic tracking-tight">{tx.mediaTitle}</p>
                             <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest mt-1">TS: {tx.createdAt?.toDate?.()?.getTime() || 'PENDING_SYNC'}</p>
                          </td>
                          <td className="px-4 py-6 font-mono text-[9px] uppercase tracking-widest text-slate-400">{tx.type || 'Media'}</td>
                          <td className="px-4 py-6 text-[10px] text-white font-black uppercase tracking-wider">{tx.ownerName || 'Unknown Auth'}</td>
                          <td className="px-4 py-6 text-right">
                            <span className={cn(
                              "text-[10px] px-3 py-1 font-black uppercase tracking-widest border",
                              tx.status === 'MINTED' ? "bg-brand-emerald/10 border-brand-emerald/30 text-brand-emerald" : "bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan"
                            )}>
                              {tx.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-panel p-10 rounded-2xl bg-gradient-to-br from-brand-cyan/[0.03] to-transparent border-brand-cyan/10">
              <div className="w-16 h-16 bg-brand-cyan/10 border border-brand-cyan/30 rounded flex items-center justify-center mb-8">
                <Lock className="w-8 h-8 text-brand-cyan" />
              </div>
              <h3 className="text-2xl heading-italic mb-4 tracking-tighter">L2L Protocol V.7</h3>
              <p className="text-slate-500 text-xs font-mono uppercase tracking-widest leading-relaxed mb-10 opacity-70">
                Lens-to-Ledger architecture secures media directly from the hardware encoder level.
              </p>
              <div className="space-y-6">
                {[
                  { n: '01', t: 'Hardware Hashing', d: 'GCP Distributed Cloud Edge' },
                  { n: '02', t: 'Temporal Integrity', d: 'Vertex AI Vision Pipeline' },
                  { n: '03', t: 'Tokenized Minting', d: 'Polygon Proof-of-Stake' },
                ].map(step => (
                  <div key={step.n} className="flex gap-6 group">
                    <div className="text-xl font-black italic text-brand-cyan opacity-40 group-hover:opacity-100 transition-opacity">{step.n}</div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight">{step.t}</p>
                      <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-10 rounded-2xl relative overflow-hidden bg-white/[0.01]">
              <div className="absolute -top-10 -right-10 opacity-5 grayscale invert">
                <Fingerprint className="w-64 h-64" />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 border-b border-white/5 pb-4">Asset Protection Index</h4>
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-5xl font-black italic tracking-tighter">1.2M</p>
                    <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest mt-2">Active Provenances</p>
                  </div>
                  <div className="text-right border-l border-white/10 pl-6">
                    <p className="text-brand-cyan text-xl font-black italic">+24%</p>
                    <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest mt-1">Delta / 30D</p>
                  </div>
                </div>
                <div className="h-1 w-full bg-white/5 overflow-hidden rounded-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-brand-cyan shadow-[0_0_15px_#00F2FF]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

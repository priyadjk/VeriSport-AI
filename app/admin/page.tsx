'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Map as MapIcon, Globe, ShieldAlert, Cpu, Activity, ArrowRight, Zap, Target, Terminal, User, Database } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';
import { useAuth } from '@/components/FirebaseProvider';

export default function AdminPage() {
  const { user } = useAuth();
  const [isSeeding, setIsSeeding] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 50)]);
  };

  const handleSeed = async () => {
    if (!user) return;
    setIsSeeding(true);
    addLog("Initializing Seed Protocol...");
    
    try {
      // Seed some records
      const seeds = [
        { mediaTitle: "CL_FCB_RM_2024", ownerName: "LALIGA_OFFICIAL", type: "Broadcast", hash: "0x82...a1" },
        { mediaTitle: "NBA_FINALS_G7_FINAL", ownerName: "NBA_LEAGUE", type: "Highlight", hash: "0x33...f2" },
        { mediaTitle: "UFC_300_MAIN_EVENT", ownerName: "UFC_PROD", type: "Live_Stream", hash: "0x11...b9" },
      ];

      for (const s of seeds) {
        addLog(`Minting Provenance for ${s.mediaTitle}...`);
        await addDoc(collection(db, 'provenance_records'), {
          ...s,
          status: 'MINTED',
          createdAt: serverTimestamp(),
          ownerId: user?.uid,
          blockchainTx: `0x${Math.random().toString(16).slice(2, 42)}`
        });
        await new Promise(r => setTimeout(r, 1000));
      }
      
      // Seed Piracy Alert
      addLog("Detecting Unauthorized Handshaking...");
      await addDoc(collection(db, 'piracy_alerts'), {
        source: 'Twitch',
        match: 'UFC_300_LIVE_RELAY',
        severity: 'High',
        status: 'Blocked',
        detectedAt: serverTimestamp(),
        location: 'US: New York',
        ipAddress: '192.168.1.42'
      });
      
      addLog("Seed Handshake Complete. Nodes Synchronized.");
    } catch (e) {
      addLog(`CRITICAL ERROR: ${e instanceof Error ? e.message : 'Unknown'}`);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex justify-between items-end border-b border-white/5 pb-6">
          <div>
            <h2 className="text-4xl heading-italic text-brand-rose">System Admin</h2>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-1">Kernel Access • Secure Shell</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-brand-rose/5 border border-brand-rose/20 rounded flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 text-brand-rose" />
              <span className="text-[10px] font-mono font-black text-brand-rose uppercase tracking-widest">Root Instance</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-panel p-10 rounded-2xl border-brand-rose/10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 font-mono">Operations</h3>
              <p className="text-sm text-slate-400 mb-10 leading-relaxed italic">
                Initialize the global provenance registry with verified seed data for development testing.
              </p>
              <button 
                onClick={handleSeed}
                disabled={isSeeding}
                className="w-full py-5 bg-brand-rose text-white font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-20 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
              >
                <Zap className="w-5 h-5" />
                {isSeeding ? 'Seeding Nodes...' : 'Execute Seed Protocol'}
              </button>
            </div>

            <div className="glass-panel p-10 rounded-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 font-mono">Admin Authorization</h3>
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-lg flex items-center gap-6">
                <div className="w-12 h-12 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-tight">{user?.displayName || 'Root_Admin'}</p>
                  <p className="text-[9px] font-mono text-brand-rose uppercase tracking-widest mt-1">Level 4 Clearance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel rounded-2xl overflow-hidden min-h-[500px] flex flex-col border-white/10">
              <div className="px-8 py-6 border-b border-white/5 bg-black/40 flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-[0.30em] flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-brand-rose" />
                  System Console Output
                </h3>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-rose animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-brand-rose/20" />
                </div>
              </div>
              <div className="flex-1 bg-black/60 p-8 font-mono text-xs overflow-y-auto space-y-4 no-scrollbar min-h-[400px]">
                {logs.length === 0 ? (
                  <p className="text-slate-700 italic">{" >> "} System Idle. Awaiting commands...</p>
                ) : (
                  logs.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "leading-relaxed",
                        log.includes('ERROR') ? "text-brand-rose" : "text-white/60"
                      )}
                    >
                      <span className="text-brand-rose/40 mr-3">#</span>
                      {log}
                    </motion.div>
                  ))
                )}
                {isSeeding && (
                  <div className="flex items-center gap-2 text-brand-rose animate-pulse">
                    <span className="w-1.5 h-4 bg-brand-rose inline-block" />
                    <p className="font-black italic">PROCESSING TRANSACTION...</p>
                  </div>
                )}
              </div>
              <div className="bg-brand-rose/5 border-t border-brand-rose/10 px-8 py-4 flex justify-between items-center">
                <p className="text-[9px] font-mono text-brand-rose uppercase tracking-[0.2em] font-black">Cluster: Vertex-GCP-82</p>
                <div className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-brand-rose shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest font-black">Operational</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

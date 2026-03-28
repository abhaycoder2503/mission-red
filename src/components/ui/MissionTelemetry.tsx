import { motion, AnimatePresence } from 'framer-motion';

type TelemetryData = {
  [key: string]: {
    label: string;
    value: string;
    metric: string;
  }[];
};

const telemetryData: TelemetryData = {
  hero: [
    { label: 'Status', value: 'Ready', metric: 'Standby' },
    { label: 'O2 Level', value: '100', metric: '%' },
    { label: 'Comm Link', value: 'Active', metric: 'Secure' },
  ],
  launch: [
    { label: 'Thrust', value: '34.5', metric: 'MN' },
    { label: 'Velocity', value: '7.8', metric: 'km/s' },
    { label: 'Altitude', value: '180', metric: 'km' },
  ],
  timeline: [
    { label: 'Path', value: 'Hohmann', metric: 'Transfer' },
    { label: 'Phase', value: '01', metric: 'Sequential' },
    { label: 'Accuracy', value: '99.9', metric: '%' },
  ],
  cruise: [
    { label: 'Distance', value: '471', metric: 'M km' },
    { label: 'Signal', value: '11.4', metric: 'm Delay' },
    { label: 'Spin Rate', value: '2.0', metric: 'rpm' },
  ],
  landing: [
    { label: 'Velocity', value: '5.4', metric: 'km/s' },
    { label: 'Altitude', value: '125', metric: 'km' },
    { label: 'Heat', value: '2100', metric: 'C' },
  ],
  exploration: [
    { label: 'Active', value: 'Sol 1100+', metric: 'Mission' },
    { label: 'Humidity', value: '0.01', metric: 'g/m3' },
    { label: 'Power', value: 'RTG', metric: 'Source' },
  ],
  team: [
    { label: 'Vanguard', value: '09+', metric: 'JPL Leads' },
    { label: 'Health', value: 'Stable', metric: 'Nominal' },
    { label: 'Morale', value: 'High', metric: 'Vivid' },
  ],
  intel: [
    { label: 'Records', value: '42', metric: 'Stored' },
    { label: 'Data', value: '1.2', metric: 'PB' },
    { label: 'Encrypt', value: 'AES', metric: '256' },
  ],
  conclusion: [
    { label: 'Success', value: '98', metric: '%' },
    { label: 'Colonist', value: '1st', metric: 'Gen' },
    { label: 'Outlook', value: 'Infinite', metric: 'Horizon' },
  ],
};

export default function MissionTelemetry({ activeId }: { activeId: string }) {
  const currentData = telemetryData[activeId as keyof TelemetryData] || telemetryData.hero;

  return (
    <div className="fixed bottom-10 left-10 z-[60] hidden flex-col gap-1 lg:flex pointer-events-none">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-400">Tactical HUD Uplink</span>
      </div>
      
      <div className="flex gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="flex gap-4"
          >
            {currentData.map((item, i) => (
              <div key={item.label} className="min-w-[100px] border-l border-white/10 pl-3">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-mono text-white leading-none tracking-tighter">{item.value}</span>
                  <span className="text-[10px] font-bold text-orange-500/60 uppercase">{item.metric}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 h-[1px] w-full bg-white/5 overflow-hidden">
        <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="h-full w-1/4 bg-orange-500/20" 
        />
      </div>
    </div>
  );
}

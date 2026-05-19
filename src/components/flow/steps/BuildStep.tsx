import { motion } from "framer-motion";

export const BuildStep = () => (
  <div className="space-y-6">
    <div className="rounded-[28px] border border-white/70 bg-white/90 p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
        Crafting
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-slate-900">
        Assembling an illustrative allocation
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        This takes a few seconds to create a balanced model mix.
      </p>
    </div>
    <div className="rounded-[28px] border border-slate-200 bg-white/85 p-6">
      <div className="grid grid-cols-5 gap-3">
        {[32, 20, 18, 12, 18].map((height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${height * 2}px` }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="w-full rounded-full bg-slate-900/80"
          />
        ))}
      </div>
      <div className="mt-6 h-4 w-full rounded-full bg-slate-200/60">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="h-4 rounded-full bg-slate-900"
        />
      </div>
    </div>
  </div>
);

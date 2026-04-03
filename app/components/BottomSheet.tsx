"use client";

import { motion } from "framer-motion";
import { Toilet } from "../types/toilet";

export default function BottomSheet({
  selected,
  onClose,
}: {
  selected: Toilet | null;
  onClose: () => void;
}) {
  if (!selected) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed bottom-0 left-0 right-0 z-[2000] bg-white rounded-t-2xl p-4 shadow-xl"
    >
      {/* Drag Handle */}
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

      {/* Content */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">
          {selected.name || "Public Toilet"}
        </h2>

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lon}`}
          target="_blank"
          className="block text-center bg-black text-white py-3 rounded-xl"
        >
          Get Directions
        </a>

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}
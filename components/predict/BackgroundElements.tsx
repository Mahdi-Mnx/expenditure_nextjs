"use client";
import { orbVariantsB } from "@/utils/animation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BackgroundElementsProps {
  mounted: boolean;
}

export function BackgroundElements({ mounted }: BackgroundElementsProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number; size: number }>
  >([]);

  useEffect(() => {
    if (mounted) {
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        size: Math.random() * 3 + 1,
      }));
      setParticles(newParticles);
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
        variants={orbVariantsB}
        initial="hidden"
        animate="visible"
        style={{
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        variants={orbVariantsB}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
        variants={orbVariantsB}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
        style={{
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Enhanced floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8 + particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: particle.delay,
          }}
          initial={{ opacity: 0, scale: 0 }}
        />
      ))}

      {/* Animated grid lines */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
            style={{
              top: `${20 + i * 30}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

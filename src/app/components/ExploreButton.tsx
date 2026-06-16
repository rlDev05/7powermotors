'use client'; // Required for Framer Motion

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function ExploreButton() {
  return (
    <Link href="/motorcycles?category=small-bike" legacyBehavior>
      <motion.a
        className="inline-flex items-center gap-2 text-accent cursor-pointer group-hover:gap-3 transition-all"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.875rem',
          fontWeight: 600,
        }}
        whileHover={{ x: 5 }}
      >
        EXPLORE
        <ChevronRight size={16} />
      </motion.a>
    </Link>
  );
}
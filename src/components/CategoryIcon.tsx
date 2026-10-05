import React from 'react';
import {
  Droplet,
  Zap,
  Armchair,
  Tv,
  Sparkles,
  Wifi,
  School,
  Bath,
  Wrench,
  HelpCircle,
} from 'lucide-react';

interface CategoryIconProps {
  category: string;
  className?: string;
  size?: number;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  className = 'w-4 h-4',
  size,
}) => {
  const norm = category.toLowerCase();

  if (norm.includes('water') || norm.includes('leak') || norm.includes('plumb')) {
    return <Droplet className={`${className} text-blue-500`} size={size} />;
  }
  if (norm.includes('electric') || norm.includes('power') || norm.includes('fan')) {
    return <Zap className={`${className} text-amber-500`} size={size} />;
  }
  if (norm.includes('furnitur') || norm.includes('chair') || norm.includes('desk') || norm.includes('table')) {
    return <Armchair className={`${className} text-indigo-500`} size={size} />;
  }
  if (norm.includes('equip') || norm.includes('projector') || norm.includes('ac') || norm.includes('device')) {
    return <Tv className={`${className} text-purple-500`} size={size} />;
  }
  if (norm.includes('clean') || norm.includes('dust') || norm.includes('waste')) {
    return <Sparkles className={`${className} text-emerald-500`} size={size} />;
  }
  if (norm.includes('wifi') || norm.includes('net') || norm.includes('internet')) {
    return <Wifi className={`${className} text-sky-500`} size={size} />;
  }
  if (norm.includes('class') || norm.includes('board') || norm.includes('hall')) {
    return <School className={`${className} text-teal-500`} size={size} />;
  }
  if (norm.includes('wash') || norm.includes('toilet') || norm.includes('restroom')) {
    return <Bath className={`${className} text-cyan-500`} size={size} />;
  }
  return <Wrench className={`${className} text-slate-500`} size={size} />;
};

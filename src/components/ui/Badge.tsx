
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'destructive';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  className = '' 
}) => {
  const baseClasses = 'inline-block rounded-full px-3 py-1 text-xs font-medium';
  
  const variantClasses = {
    default: 'bg-purple-100 text-purple-800',
    secondary: 'bg-gray-100 text-gray-800',
    outline: 'bg-transparent border border-purple-500 text-purple-700',
    success: 'bg-green-100 text-green-800',
    destructive: 'bg-red-100 text-red-800',
  };

  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
export default function Counter() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Initialize count from Supabase
    const fetchCount = async () => {
      const { data, error } = await supabase
        .from('counter')
        .select('count')
        .single();

      if (error) console.error('Error fetching count:', error);
      if (data) setCount(data.count);
    };

    fetchCount();
  }, []);

  const increment = async () => {
    try {
      const { data, error } = await supabase
        .from('counter')
        .update({ count: count + 1 })
        .eq('id', 1)
        .select();

      if (error) throw error;
      if (data) setCount(data[0].count);
    } catch (error) {
      console.error('Error incrementing count:', error);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-sky-500/20">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold text-teal-400">Interactive Click Counter</h2>
        <p className="text-gray-400 text-center mb-4">A simple counter that persists across page refreshes using Supabase</p>
        <div className="text-4xl font-bold text-white">{count}</div>
        <button 
          onClick={increment}
          className="px-6 py-3 bg-teal-400 text-gray-900 rounded-lg font-semibold hover:bg-teal-300 transition-colors duration-300"
        >
          Click Me!
        </button>
      </div>
    </div>
  );
}

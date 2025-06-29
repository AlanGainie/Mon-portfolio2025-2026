import { useState } from 'react';
import Button from './Button.tsx';

// Onglets passés en props (dynamique)
function barreDeDefilement({ className, setTab, tabs, }: { className?: string; setTab: (tab: number) => void; tabs: string[]; }) {
  return (
    <div className={className}>
      {tabs.map((name, index) => (
        <Button key={index} name={name} onClick={() => setTab(index)} />
      ))}
    </div>
  );
}

export default barreDeDefilement;

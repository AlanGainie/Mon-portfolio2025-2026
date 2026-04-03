import Button from '../composants/ui/Button';

// TODO: Améliorer le system en définisant un type personnaliser menue
// Onglets passés en props (dynamique)
/**
 * This function generate a menue and differents elements buttons in it
 * @param className Is an intern classname you want in menue
 * @param setTab Is all actions have to do when you click into the buttons
 * @param tabs Is a list of different menue you read
 * @param icons Is a list of icones have must for all buttons
 * @returns 
 */
export default function barreDeDefilement({ className, setTab, tabs, icons}:
  { className?: string;
    setTab: (tab: number) => void;
    tabs: string[];
    icons?: (string[]);}) {

  return (
    <div className={className}>
      {tabs.map((name, index) => (
        <Button
          key={index}
          name={name}
          icon={icons?.[index]}
          onClick={() => setTab(index)}
          uncolor={true}/>
      ))}
    </div>
  );
}

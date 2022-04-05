// Libs
import { connectSortBy } from "react-instantsearch-dom";

// Components
import Select from "@components/ui/Select";

const Sort: React.FC<{
  items: Array<{ value: string; label: string }>;
  refine: (value: string) => void;
  currentRefinement: string;
}> = ({ items, refine, currentRefinement }) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    refine(event.currentTarget.value);
  };

  return (
    <Select onChange={handleSelect} value={currentRefinement}>
      {items.map((item) => (
        <option value={item.value} key={`sort-${item.value}`}>
          {item.label}
        </option>
      ))}
    </Select>
  );
};

export default connectSortBy(Sort);

import { AutoComplete } from "antd";
import { useState } from "react";

const { Option } = AutoComplete;

type SuggestionOption = {
  value: string;
  description: string;
};

interface CustomAutoCompleteProps {
  onSubmit: (value: string) => void;
}

export const CustomAutoComplete: React.FC<CustomAutoCompleteProps> = ({ onSubmit }) => {
  const suggestions: SuggestionOption[] = [
    {value: '/generate-scene', description: 'Generates a new scene'},
    {value: '/generate-story', description: 'Generates a new story'}
  ];

  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<SuggestionOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSearch = (searchText: string) => {
    if (!selectedOption || !searchText) {
      const filteredOptions = suggestions.filter((option) =>
        option.value.toLowerCase().includes(searchText.toLowerCase())
      );
      setOptions(filteredOptions);
    }
  };

  const onSelect = (selectedValue: string) => {
    setSelectedOption(selectedValue);
    setValue(selectedValue + ` `);
    setOptions([]);
  };

  const onChange = (inputValue: string) => {
    if (selectedOption && inputValue) {
      setValue(inputValue);
    } else {
      setValue(inputValue);
      handleSearch(inputValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <AutoComplete
      style={{ position: 'absolute', bottom: 0, width: '100%', border: 'none' }}
      className="custom-auto-complete"
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      onKeyDown={handleKeyDown}
      placeholder="Enter command..."
    >
      {options.map((suggestion) => (
        <Option key={suggestion.value} value={suggestion.value}>
          <div>
            <div style={{fontWeight: '600'}}>{suggestion.value}</div>
            <small style={{fontSize: '0.8em', color: '#888'}}>{suggestion.description}</small>
          </div>
        </Option>
      ))}
    </AutoComplete>
  );
};

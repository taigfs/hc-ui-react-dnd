import { AutoComplete } from "antd";
import { useState } from "react";

const { Option } = AutoComplete;

type SuggestionOption = {
  value: string;
  description: string;
};

export const CustomAutoComplete: React.FC = () => {
  const suggestions: SuggestionOption[] = [
    {value: '/generate-scene', description: 'Generates a new scene'},
    {value: '/generate-story', description: 'Generates a new story'}
  ];

  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<SuggestionOption[]>([]);

  const handleSearch = (searchText: string) => {
    const filteredOptions = suggestions.filter((option) =>
      option.value.toLowerCase().includes(searchText.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  const onSelect = (selectedValue: string) => {
    setValue(selectedValue);
  };

  const onChange = (inputValue: string) => {
    setValue(inputValue);
    handleSearch(inputValue);
  };

  return (
    <AutoComplete
      style={{ position: 'absolute', bottom: 0, width: '100%', border: 'none' }}
      className="custom-auto-complete"
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      placeholder="Enter command..."
    >
      {suggestions.map((suggestion) => (
        <Option key={suggestion.value} value={suggestion.value}>
          <div>
            <div>{suggestion.value}</div>
            <small style={{fontSize: '0.8em', color: '#888'}}>{suggestion.description}</small>
          </div>
        </Option>
      ))}
    </AutoComplete>
  );
};

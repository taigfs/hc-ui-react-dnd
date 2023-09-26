import { AutoComplete } from "antd";
import { useState } from "react";

const { Option } = AutoComplete;

export const CustomAutoComplete: React.FC = () => {
  const suggestions: string[] = ['/generate-scene', '/generate-story'];

  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);

  const handleSearch = (searchText: string) => {
    const filteredOptions = suggestions.filter((option) =>
      option.toLowerCase().includes(searchText.toLowerCase())
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
      style={{ position: 'absolute', bottom: 0, width: '100%', padding: '10px', border: 'none', borderTop: '1px solid', backgroundColor: '#f0f0f0', borderRadius: '0' }}
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      placeholder="Enter command..."
    >
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </AutoComplete>
  );
};
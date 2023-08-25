import React from 'react';

interface SheetProps {
  type: 'metadata';
}

const Sheet: React.FC<SheetProps> = () => {
  return (
    <div>
      Hello World
    </div>
  );
};

export default Sheet;

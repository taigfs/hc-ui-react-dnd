import React from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

interface SheetProps {
  type: 'metadata' | 'data';
}

const Sheet: React.FC<SheetProps> = () => {
  
  const container = document.querySelector('#example');
  console.log(container);
  
  if (!container) { return null; }

  const hot = new Handsontable(container, {
    data: [
      ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
      ['2019', 10, 11, 12, 13],
      ['2020', 20, 11, 14, 13],
      ['2021', 30, 15, 12, 13]
    ],
    rowHeaders: true,
    colHeaders: true,
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation' // for non-commercial use only
  });

  return (
    <div>
      <div id="example"></div>
    </div>
  );
};

export default Sheet;

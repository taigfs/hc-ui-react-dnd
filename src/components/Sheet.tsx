import React, { useEffect, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

interface SheetProps {
  type: 'metadata' | 'data';
}

const Sheet: React.FC<SheetProps> = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hot = new Handsontable(container, {
      data: [
        ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
        ['2019', 10, 11, 12, 13],
        ['2020', 20, 11, 14, 13],
        ['2021', 30, 15, 12, 13]
      ],
      rowHeaders: true,
      colHeaders: true,
      width: '100%', // Set the width to 100%
      height: 'auto',
      licenseKey: 'non-commercial-and-evaluation' // for non-commercial use only
    });

    return () => {
      hot.destroy();
    };
  }, []);

  return (
    <div style={{ width: '100%' }}> {/* Set the width to 100% */}
      <div ref={containerRef}></div>
    </div>
  );
};

export default Sheet;

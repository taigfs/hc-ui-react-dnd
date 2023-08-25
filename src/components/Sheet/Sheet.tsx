import React, { useEffect, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

interface SheetProps {
  type: 'metadata' | 'data';
  entity: 'agents' | 'nodes' | 'edges' | string;
  handsontableData: any[];
}

const Sheet: React.FC<SheetProps> = ({
  handsontableData: data,
}) => {
  console.log(data);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hot = new Handsontable(container, {
      data,
      stretchH: 'all',
      rowHeaders: true,
      colHeaders: true,
      width: '100%', // Set the width to 100%
      height: 'auto',
      licenseKey: 'non-commercial-and-evaluation' // for non-commercial use only
    });

    return () => {
      hot.destroy();
    };
  }, [data]);

  return (
    <div style={{ width: '100%' }}> {/* Set the width to 100% */}
      <div ref={containerRef} style={{ width: '100%' }}></div>
    </div>
  );
};

export default Sheet;

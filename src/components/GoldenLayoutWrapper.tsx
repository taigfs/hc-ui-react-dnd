// GoldenLayoutWrapper.tsx
import React, { useRef, useEffect, ReactNode } from 'react';
import * as GoldenLayout from "golden-layout";

export const GoldenLayoutWrapper = () => {
    var myLayout = new GoldenLayout({
      content: [{
          type: 'row',
          content:[{
              type:'react-component',
              component: 'test-component',
              props: { label: 'A' }
          },{
              type: 'column',
              content:[{
                  type:'react-component',
                  component: 'test-component',
                  props: { label: 'B' }
              },{
                  type:'react-component',
                  component: 'test-component',
                  props: { label: 'C' }
              }]
          }]
      }]
  });

  return null;
}

// interface GoldenLayoutWrapperProps {
//     config: any;
//     registerComponents: (layout: any) => void;
// }

// const GoldenLayoutWrapper: React.FC<GoldenLayoutWrapperProps> = ({ config, registerComponents }) => {
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (!containerRef.current) return;

//         const layout = new GoldenLayout(config, containerRef.current);

//         registerComponents(layout);

//         layout.init();

//         return () => layout.destroy();
//     }, [config, registerComponents]);

//     return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
// };

// export default GoldenLayoutWrapper;

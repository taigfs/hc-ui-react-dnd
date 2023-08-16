import React, { useRef, useEffect } from 'react';
import { default as GoldenLayout } from 'golden-layout';

export const GoldenLayoutWrapper = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const myLayout = new GoldenLayout({
      content: [
        {
          type: 'row',
          content: [
            {
              type: 'react-component',
              component: 'test-component',
              props: { label: 'A' },
            },
            {
              type: 'column',
              content: [
                {
                  type: 'react-component',
                  component: 'test-component',
                  props: { label: 'B' },
                },
                {
                  type: 'react-component',
                  component: 'test-component',
                  props: { label: 'C' },
                },
              ],
            },
          ],
        },
      ],
    }, containerRef.current);

    myLayout.init();

    return () => myLayout.destroy();
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

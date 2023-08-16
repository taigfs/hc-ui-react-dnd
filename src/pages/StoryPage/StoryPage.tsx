import styled from "styled-components";
import { Mosaic, MosaicWindow } from 'react-mosaic-component';

import { AgentsToolbar } from "../../components/Toolbar/AgentsToolbar";
import { useBoardStore } from "../../state/BoardStore";
import { HCLayout } from "../../components/HCLayout";
import { useAppStore } from "../../state/AppStore";
import 'react-mosaic-component/react-mosaic-component.css';

export function StoryPage() {
  const { setIsPlaying, isPlaying } = useBoardStore((state) => state);
  const { currentScene } = useAppStore((state) => state);

  const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
    a: (
      <MosaicWindow<string>
        title="Left Window"
        toolbarControls={<AgentsToolbar />}
      >
        <div>Left Window</div>
      </MosaicWindow>
    ),
    b: (
      <MosaicWindow<string>
        title="Top Right Window"
        toolbarControls={<AgentsToolbar />}
      >
        <div>Top Right Window</div>
      </MosaicWindow>
    ),
    c: (
      <MosaicWindow<string>
        title="Bottom Right Window"
        toolbarControls={<AgentsToolbar />}
      >
        <div>Bottom Right Window</div>
      </MosaicWindow>
    ),
  };

  return (
    <div style={{ width: '100%', height: '100%', margin: 0 }}>
      <Mosaic<string>
        renderTile={(id) => ELEMENT_MAP[id]}
        initialValue={{
          direction: 'row',
          first: 'a',
          second: {
            direction: 'column',
            first: 'b',
            second: 'c',
          },
          splitPercentage: 40,
        }}
      />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #000;
  color: white;
  position: relative;
`;

const Toolbars = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-right: 2px solid ${({ theme }) => theme.color.squareBorder};
`;

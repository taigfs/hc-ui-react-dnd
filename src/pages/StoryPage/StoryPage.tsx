import styled from "styled-components";

import { AgentsToolbar } from "../../components/Toolbar/AgentsToolbar";
import { useBoardStore } from "../../state/BoardStore";
import { HCLayout } from "../../components/HCLayout";
import { useAppStore } from "../../state/AppStore";

export function StoryPage() {
  const { setIsPlaying, isPlaying } = useBoardStore((state) => state);
  const { currentScene } = useAppStore((state) => state);

  return (
    <HCLayout hasContent={false}>
      <Container>
        <Toolbars>
          hello
        </Toolbars>
        <div>
          hello
        </div>
      </Container>
    </HCLayout>
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

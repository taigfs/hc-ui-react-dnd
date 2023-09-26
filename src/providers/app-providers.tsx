import { ScenesProvider } from "../hooks/use-local-scenes";
import { NodesProvider } from "../hooks/use-local-nodes";
import { StoriesProvider } from "../hooks/use-local-stories";
import { AgentClassesProvider } from "../hooks/use-local-agent-classes";
import { AgentsProvider } from "../hooks/use-local-agents";
import { EdgesProvider } from "../hooks/use-local-edges";
import { ExecutionProvider } from "../hooks/use-local-execution";
import { MapAssetsProvider } from "../hooks/use-local-map-assets";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <MapAssetsProvider>
    <ScenesProvider>
      <NodesProvider>
        <StoriesProvider>
          <AgentClassesProvider>
            <AgentsProvider>
              <EdgesProvider>
                <ExecutionProvider>
                  {children}
                </ExecutionProvider>
              </EdgesProvider>
            </AgentsProvider>
          </AgentClassesProvider>
        </StoriesProvider>
      </NodesProvider>
    </ScenesProvider>
  </MapAssetsProvider>
);

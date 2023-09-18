import { ScenesProvider } from "../hooks/use-local-scenes";
import { NodesProvider } from "../hooks/use-local-nodes";
import { StoriesProvider } from "../hooks/use-local-stories";
import { AgentClassesProvider } from "../hooks/use-local-agent-classes";
import { AgentsProvider } from "../hooks/use-local-agents";
import { EdgesProvider } from "../hooks/use-local-edges";
import { ExecutionProvider } from "../hooks/use-local-execution";

export const Providers = ({ children }: { children: React.ReactNode }) => (
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
);

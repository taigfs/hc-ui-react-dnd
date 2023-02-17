import { GameObj, KaboomCtx, Tag } from "kaboom";
import { AGENT_SPEED, cellSize } from "../enum";
import { getAgentAssetSpritePath } from "../enum/AgentAssets";

function getSpriteName (sprite: string) {
  return sprite.split(".")[0];
}

function getXY (boardX: number, boardY: number) {
  return {
    x: boardX * cellSize,
    y: boardY * cellSize
  }
}

function loadSprite (k: KaboomCtx, sprite: string) {
  const spriteName = getSpriteName(sprite);
  k.loadSprite(spriteName, getAgentAssetSpritePath(sprite));
}

function addSprite (k: KaboomCtx, sprite: string, boardX: number, boardY: number) {
  const spriteName = getSpriteName(sprite);
  const { x, y } = getXY(boardX, boardY);

  const img = new Image();
  img.src = getAgentAssetSpritePath(sprite);
  img.onload = () => {
    k.add([
      k.sprite(spriteName),
      k.pos(x + (cellSize - img.width) / 2, y + (cellSize - img.height) / 2),
      spriteName as Tag,
    ]);
  };
}

function moveAgent (k: KaboomCtx, sprite: string, boardX: number, boardY: number) {
  const spriteName = getSpriteName(sprite);
  
  const agent: GameObj = k.get(spriteName) && k.get(spriteName)[0];
  if (!agent) { return; }

  const { x, y } = getXY(boardX, boardY);
  console.log(x, y);

  k.wait(1, function() {
    // console.log(k.vec2(x, y));
    agent.moveTo(k.vec2(x, y));
    // agent.pos = k.vec2(x, y);
  })
}

export const KaboomService = {
  loadSprite,
  addSprite,
  moveAgent,
}
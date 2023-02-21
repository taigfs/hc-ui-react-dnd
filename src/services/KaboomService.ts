import { GameObj, KaboomCtx, Tag, Vec2 } from "kaboom";
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

function moveAgent (k: KaboomCtx, sprite: string, boardX: number, boardY: number, callback = () => {}) {

  const spriteName = getSpriteName(sprite);
  
  const agent: GameObj = k.get(spriteName) && k.get(spriteName)[0];
  if (!agent) { return; }

  const { x, y } = getXY(boardX, boardY);
  let pos = k.vec2(x, y);

  // get img center x, y
  const img = new Image();
  img.src = getAgentAssetSpritePath(sprite);
  img.onload = () => {
    pos = k.vec2(x + (cellSize - img.width) / 2, y + (cellSize - img.height) / 2);
  };
  const speed = AGENT_SPEED;

  let stuckX = false;
  let stuckY = false;

  const moveRight = () => agent.move(k.RIGHT.scale(speed));
  const moveLeft = () => agent.move(k.LEFT.scale(speed));
  const moveUp = () => agent.move(k.UP.scale(speed));
  const moveDown = () => agent.move(k.DOWN.scale(speed));

  const moveHorizontalIfNeeded = () => {
    if (agent.pos.x < pos.x) { 
      moveRight();
      agent.direction = 'h';
    }
    else if (agent.pos.x >= pos.x + 50) { 
      moveLeft(); 
      agent.direction = 'h';
    } else { 
      agent.direction = 'v';
      stuckX = true;
    }
  }

  const moveVerticalIfNeeded = () => {
    if (agent.pos.y < pos.y) { 
      moveDown(); 
      agent.direction = 'v';
    }
    else if (agent.pos.y >= pos.y + 50) { 
      moveUp(); 
      agent.direction = 'v';
    } else { 
      agent.direction = 'h';
      stuckY = true; 
    }
  }
  
  const cancelEvent = k.onUpdate(spriteName, (agent) => {
    if (stuckX && stuckY) { return; }
    if (agent.direction === 'h') {
      moveHorizontalIfNeeded();
    } else {
      moveVerticalIfNeeded();
    }
  });
  
}

export const KaboomService = {
  loadSprite,
  addSprite,
  moveAgent,
}
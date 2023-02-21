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

function addSprite (k: KaboomCtx, sprite: string, boardX: number, boardY: number, id: string) {
  const spriteName = getSpriteName(sprite);
  const { x, y } = getXY(boardX, boardY);

  const img = new Image();
  img.src = getAgentAssetSpritePath(sprite);
  img.onload = () => {
    k.add([
      k.sprite(spriteName),
      k.pos(x + (cellSize - img.width) / 2, y + (cellSize - img.height) / 2),
      id as Tag,
    ]);
  };
}

function moveAgent (k: KaboomCtx, sprite: string, boardX: number, boardY: number, id: string, callback = () => {}) {

  const agent: GameObj = k.get(id) && k.get(id)[0];
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

  let stuck = {
    x: false,
    y: false
  };

  const moveRight = () => agent.move(k.RIGHT.scale(speed));
  const moveLeft = () => agent.move(k.LEFT.scale(speed));
  const moveUp = () => agent.move(k.UP.scale(speed));
  const moveDown = () => agent.move(k.DOWN.scale(speed));

  const moveIfNeeded = (dir: 'x' | 'y', targetPos: Vec2) => {
    const isHorizontal = (dir === "x");
    const moveForward = isHorizontal ? moveRight : moveDown;
    const moveBackward = isHorizontal ? moveLeft : moveUp;

    if (agent.pos[dir] < targetPos[dir]) {
      moveForward();
      agent.direction = dir;
    } else if (agent.pos[dir] > targetPos[dir] + 50) {
      moveBackward();
      agent.direction = dir;
    } else {
      if (stuck.x && stuck.y) {
        cancelEvent();
        callback();
      }
      agent.direction = isHorizontal ? 'y' : 'x';
      if (isHorizontal) {
        stuck.x = true;
      } else {
        stuck.y = true;
      }
    }
  }
  
  const cancelEvent = k.onUpdate(id, (agent) => {
    let dir: 'x' | 'y' = agent.direction;
    
    if ((agent.pos[dir] % cellSize) < 10 && !stuck[dir === 'x' ? 'y' : 'x']) {
      const newDir = Math.random() * 100 < 50 ? 'x' : 'y';
      dir = newDir;
    }
    
    if (dir === 'x') {
      moveIfNeeded('x', pos);
    } else {
      moveIfNeeded('y', pos);
    }
  });
  
}

export const KaboomService = {
  loadSprite,
  addSprite,
  moveAgent,
}
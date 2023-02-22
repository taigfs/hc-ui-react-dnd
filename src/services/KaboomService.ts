import { GameObj, KaboomCtx, Tag, Vec2 } from "kaboom";

import { AGENT_SPEED, cellSize } from "../enum";
import { agentAssets, getAgentAssetSpritePath } from "../enum/AgentAssets";
import { mapAssets, getMapAssetSpritePath } from "../enum/MapAssets";

function getXY(boardX: number, boardY: number) {
  return {
    x: boardX * cellSize,
    y: boardY * cellSize,
  };
}

function loadSprites(k: KaboomCtx) {
  mapAssets.forEach((sprite) => {
    console.log(sprite);
    k.loadSprite(sprite + ``, getMapAssetSpritePath(sprite + ``));
  });
  agentAssets.forEach((sprite) => {
    k.loadSprite(sprite, getAgentAssetSpritePath(sprite));
  });
}

function addMapAssetSprite(
  k: KaboomCtx,
  sprite: string,
  boardX: number,
  boardY: number
) {
  const { x, y } = getXY(boardX, boardY);
  k.add([
    k.sprite(sprite, {
      width: cellSize,
      height: cellSize,
      tiled: true, // if cellSize is different than 63, we have to turn it off
    }),
    k.pos(x, y),
  ]);
}

function addAgentSprite(
  k: KaboomCtx,
  sprite: string,
  boardX: number,
  boardY: number,
  id: string
) {
  const { x, y } = getXY(boardX, boardY);

  const img = new Image();
  img.src = getAgentAssetSpritePath(sprite);
  img.onload = () => {
    k.add([
      k.sprite(sprite),
      k.pos(x + (cellSize - img.width) / 2, y + (cellSize - img.height) / 2),
      id as Tag,
    ]);
  };
}

function moveAgent(
  k: KaboomCtx,
  sprite: string,
  boardX: number,
  boardY: number,
  id: string,
  callback = () => {}
) {
  const agent: GameObj = k.get(id) && k.get(id)[0];
  if (!agent) {
    return;
  }

  const { x, y } = getXY(boardX, boardY);
  let pos = k.vec2(x, y);

  // get img center x, y
  const img = new Image();
  img.src = getAgentAssetSpritePath(sprite);
  img.onload = () => {
    pos = k.vec2(
      x + (cellSize - img.width) / 2,
      y + (cellSize - img.height) / 2
    );
  };
  const speed = AGENT_SPEED;

  const stuck = {
    x: false,
    y: false,
  };

  const moveRight = () => agent.move(k.RIGHT.scale(speed));
  const moveLeft = () => agent.move(k.LEFT.scale(speed));
  const moveUp = () => agent.move(k.UP.scale(speed));
  const moveDown = () => agent.move(k.DOWN.scale(speed));

  const moveIfNeeded = (dir: "x" | "y", targetPos: Vec2) => {
    const isHorizontal = dir === "x";
    const moveForward = isHorizontal ? moveRight : moveDown;
    const moveBackward = isHorizontal ? moveLeft : moveUp;

    if (agent.pos[dir] < targetPos[dir]) {
      moveForward();
      agent.direction = dir;
    } else if (agent.pos[dir] > targetPos[dir] + cellSize) {
      moveBackward();
      agent.direction = dir;
    } else {
      if (stuck.x && stuck.y) {
        cancelEvent();
        callback();
      }
      agent.direction = isHorizontal ? "y" : "x";
      if (isHorizontal) {
        stuck.x = true;
      } else {
        stuck.y = true;
      }
    }
  };

  const cancelEvent = k.onUpdate(id, (agent) => {
    let dir: "x" | "y" = agent.direction;

    if (agent.pos[dir] % cellSize < 10 && !stuck[dir === "x" ? "y" : "x"]) {
      const newDir = Math.random() * 100 < 50 ? "x" : "y";
      dir = newDir;
    }

    if (dir === "x") {
      moveIfNeeded("x", pos);
    } else {
      moveIfNeeded("y", pos);
    }
  });
}

export const KaboomService = {
  loadSprites,
  addAgentSprite,
  addMapAssetSprite,
  moveAgent,
};

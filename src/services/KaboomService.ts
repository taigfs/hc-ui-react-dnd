import { GameObj, KaboomCtx, Tag, Vec2 } from "kaboom";

import { AGENT_SPEED, cellSize } from "../enum";
import {
  agentAssets,
  agentAssetsAtlas,
  getAgentAssetSpritePath,
} from "../enum/AgentAssets";
import { mapAssets, getMapAssetSpritePath } from "../enum/MapAssets";

function getXY(boardX: number, boardY: number) {
  return {
    x: boardX * cellSize,
    y: boardY * cellSize,
  };
}

function loadSpritesAtlas(k: KaboomCtx) {
  agentAssetsAtlas.forEach((spriteAtlas) => {
    k.loadSpriteAtlas(getAgentAssetSpritePath(spriteAtlas), {
      [spriteAtlas]: {
        x: 0,
        y: 0,
        width: 130,
        height: 192,
        sliceX: 4,
        sliceY: 4,
        anims: {
          idleU: 12,
          idleD: 0,
          idleR: 10,
          idleL: 6,
          walkU: {
            from: 13,
            to: 15,
            speed: 10,
            loop: true,
          },
          walkD: {
            from: 1,
            to: 3,
            speed: 10,
            loop: true,
          },
          walkR: {
            from: 9,
            to: 11,
            speed: 10,
            loop: true,
          },
          walkL: {
            from: 7,
            to: 9,
            speed: 10,
            loop: true,
          },
        },
      },
    });
  });
}

function loadSprites(k: KaboomCtx) {
  loadSpritesAtlas(k);
  mapAssets.forEach((sprite) => {
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

  // const img = new Image();
  // img.src = getAgentAssetSpritePath(sprite);
  // img.onload = () => {
  //   k.add([
  //     k.sprite(sprite),
  //     k.pos(x + (cellSize - img.width) / 2, y + (cellSize - img.height) / 2),
  //     id as Tag,
  //   ]);
  // };
  k.add([k.sprite(sprite), k.pos(x, y), id as Tag]);
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

  const hasAnim = agentAssetsAtlas.includes(sprite);

  const moveRight = () => {
    if (hasAnim && agent.curAnim() !== "walkR") {
      agent.play("walkR");
    }
    agent.move(k.RIGHT.scale(speed));
  };
  const moveLeft = () => {
    agent.move(k.LEFT.scale(speed));
    if (hasAnim && agent.curAnim() !== "walkL") {
      agent.play("walkL");
    }
  };
  const moveUp = () => {
    agent.move(k.UP.scale(speed));
    if (hasAnim && agent.curAnim() !== "walkU") {
      agent.play("walkU");
    }
  };
  const moveDown = () => {
    agent.move(k.DOWN.scale(speed));
    if (hasAnim && agent.curAnim() !== "walkD") {
      agent.play("walkD");
    }
  };

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
        hasAnim && agent.play("idleD");
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
  loadSpritesAtlas,
  loadSprites,
  addAgentSprite,
  addMapAssetSprite,
  moveAgent,
};

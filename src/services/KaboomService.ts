import { GameObj, KaboomCtx, Tag, Vec2 } from "kaboom";

import { AGENT_SPEED, cellSize } from "../enum";
import { getMapAssetSpritePath } from "../enum/MapAssets";
import { MapAssetSprite } from "../interfaces/MapAssetSprite";
import { AgentSprite } from "../interfaces/AgentSprite";
import { getKaboomSpriteName } from "../utils/get-kaboom-sprite-name";
import { ExecutionMode} from "../types/execution-mode.type";

const getSpriteName = getKaboomSpriteName;

function getXY(boardX: number, boardY: number) {
  return {
    x: boardX * cellSize,
    y: boardY * cellSize,
  };
}

function loadSpriteAtlas(k: KaboomCtx, spriteName: string, path: string) {
  k.loadSpriteAtlas(path, {
    [spriteName]: {
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
}

function loadSprites(
  k: KaboomCtx,
  mapAssetSprites: MapAssetSprite[],
  agentSprites: Record<string, AgentSprite>
) {
  mapAssetSprites.forEach((sprite) => {
    k.loadSprite(
      getSpriteName(sprite.name, false),
      getMapAssetSpritePath(sprite.name + ``)
    );
  });

  Object.keys(agentSprites).forEach((key) => {
    const agentSprite = agentSprites[key];
    if (agentSprite.isAtlas) {
      loadSpriteAtlas(
        k,
        getSpriteName(key, true),
        agentSprites[key].path
      );
    } else {
      k.loadSprite(getSpriteName(key, true), agentSprites[key].path);
    }
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
    k.sprite(getSpriteName(sprite, false), {
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
  k.add([
    k.sprite(getSpriteName(sprite, true)),
    k.pos(x, y),
    id as Tag,
    {
      hasAnim: sprite === '1'
    }
  ]);
}

function moveAgent(
  k: KaboomCtx,
  sprite: string | null,
  boardX: number,
  boardY: number,
  id: string
): Promise<void> {
  return new Promise((resolve) => {
    const agent: GameObj = k.get(id) && k.get(id)[0];
    if (!agent) {
      return;
    }

    const { x, y } = getXY(boardX, boardY);
    let pos = k.vec2(x, y);

    const speed = AGENT_SPEED;

    const stuck = {
      x: false,
      y: false,
    };

    const hasAnim = agent.hasAnim;

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
          resolve();
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
  });
}

export const KaboomService = {
  loadSprites,
  addAgentSprite,
  addMapAssetSprite,
  moveAgent,
};

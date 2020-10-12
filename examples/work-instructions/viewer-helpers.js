// SCENE UTILS
export const loadScene = async (streamKey, viewerRef) => {
  const viewer = viewerRef || document.querySelector('#viewer');
  await viewer.load(`urn:vertexvis:stream-key:${streamKey}`);
};

//
// VIEWER OVERLAY UTILS
//

export const hideOverlay = () => {
  const overlayContainer = document.getElementById('overlay-container');
  overlayContainer.style.visibility = 'hidden';
};

export const setOverlay = (innerHTML) => {
  const overlayContainer = document.getElementById('overlay-container');
  overlayContainer.innerHTML = innerHTML;
};

let overlayTimer;
export const showOverlay = (duration) => {
  const overlayContainer = document.getElementById('overlay-container');
  overlayContainer.style.visibility = 'visible';
  if (overlayTimer !== undefined) {
    clearTimeout(overlayTimer);
    overlayTimer = undefined;
  }
  if (duration > 0) {
    overlayTimer = setTimeout(() => {
      hideOverlay();
      overlayTimer = undefined;
    }, duration);
  }
};

export const moveOverlay = (position) => {
  const overlayContainer = document.getElementById('overlay-container');
  overlayContainer.style.left = `${position.x}px`;
  overlayContainer.style.top = `${position.y}px`;
};

//
// COLOR UTILS
//
const hexRegex = /^(#|0x)?([A-Fa-f0-9]{6})$/;
const colorFromHex = (str) => {
  let color = { r: 0, g: 0, b: 0 };
  const match = hexRegex.exec(str);
  if (match != null) {
    const normalized = parseInt(match[2], 16) & 0xffffff;
    color = {
      r: (normalized >> 16) & 0xff,
      g: (normalized >> 8) & 0xff,
      b: normalized & 0xff,
    };
  }
  return {
    opacity: 100,
    glossiness: 100,
    diffuse: {
      ...color,
    },
    ambient: {
      r: 255,
      g: 255,
      b: 255,
      a: 0,
    },
    specular: {
      r: 255,
      g: 255,
      b: 255,
      a: 0,
    },
    emissive: {
      r: 255,
      g: 255,
      b: 255,
      a: 0,
    },
  };
};

//
// INTERACTION UTILS
//
export const getOuterPosition = async (canvasPosition, viewerInstance) => {
  const vwr = viewerInstance || document.querySelector('#viewer');
  const scene = await vwr.scene();
  const canvasWidth = scene.frame.imageAttributes.frameDimensions.width;
  const canvasHeight = scene.frame.imageAttributes.frameDimensions.height;
  const xOffset = Math.floor((vwr.clientWidth - canvasWidth) / 2);
  const yOffset = Math.floor((vwr.clientHeight - canvasHeight) / 2);
  return {
    x: canvasPosition.x + xOffset,
    y: canvasPosition.y + yOffset,
  };
};

export const getHitsAtPosition = async (position, viewerInstance) => {
  const vwr = viewerInstance || document.querySelector('#viewer');
  const scene = await vwr.scene();
  const raycaster = await scene.raycaster();
  const hitItems = await raycaster.hitItems(position);

  if (hitItems['hits'].length > 0) {
    return hitItems['hits'].map((hit) => {
      return {
        sceneItemId: hit.itemId.hex,
        hitPoint: hit.hitPoint,
        hitNormal: hit.hitNormal,
        sceneItemSuppliedId: '',
        sceneItemPartName: '',
      };
    });
  } else {
    return undefined;
  }
};

export const getHitPointAtPosition = async (position, viewerInstance) => {
  const vwr = viewerInstance || document.querySelector('#viewer');
  const scene = await vwr.scene();
  const raycaster = await scene.raycaster();
  const hitItems = await raycaster.hitItems(position);

  if (hitItems['hits'].length > 0) {
    return hitItems['hits'][0]['hitPoint'];
  } else {
    return undefined;
  }
};

export const hideSceneItemById = async (sceneItemId, viewerInstance) => {
  const viewer = viewerInstance || document.querySelector('#viewer');
  const scene = await viewer.scene();
  await scene
    .items((op) => [op.where((q) => q.withItemId(sceneItemId)).hide()])
    .execute();
};

export const hideSceneItemBySuppliedId = async (suppliedId, viewerInstance) => {
  const viewer = viewerInstance || document.querySelector('#viewer');
  const scene = await viewer.scene();
  await scene
    .items((op) => [op.where((q) => q.withSuppliedId(suppliedId)).hide()])
    .execute();
};

export const showSceneItemById = async (sceneItemId, viewerInstance) => {
  const viewer = viewerInstance || document.querySelector('#viewer');
  const scene = await viewer.scene();
  await scene
    .items((op) => [op.where((q) => q.withItemId(sceneItemId)).show()])
    .execute();
};

export const showSceneItemBySuppliedId = async (suppliedId, viewerInstance) => {
  const viewer = viewerInstance || document.querySelector('#viewer');
  const scene = await viewer.scene();
  await scene
    .items((op) => [op.where((q) => q.withSuppliedId(suppliedId)).show()])
    .execute();
};

export const highlightSceneItem = async (
  sceneItemId,
  color,
  duration,
  viewerInstance
) => {
  const material = colorFromHex(color);
  const viewer = viewerInstance || document.querySelector('#viewer');
  const scene = await viewer.scene();
  await scene
    .items((op) => [
      op.where((q) => q.withItemId(sceneItemId)).materialOverride(material),
    ])
    .execute();
  if (duration && duration > 0) {
    setTimeout(async () => {
      const scene = await viewer.scene();
      await scene
        .items((op) => [
          op.where((q) => q.withItemId(sceneItemId)).clearMaterialOverrides(),
        ])
        .execute();
    }, duration);
  }
};

export const highlightSceneItemBySuppliedId = async (
  suppliedId,
  color,
  duration,
  viewerInstance
) => {
  const material = colorFromHex(color);
  const viewer = viewerInstance || document.querySelector('#viewer');
  const scene = await viewer.scene();
  await scene
    .items((op) => [
      op.where((q) => q.withSuppliedId(suppliedId)).materialOverride(material),
    ])
    .execute();
  if (duration && duration > 0) {
    setTimeout(async () => {
      const scene = await viewer.scene();
      await scene
        .items((op) => [
          op
            .where((q) => q.withSuppliedId(suppliedId))
            .clearMaterialOverrides(),
        ])
        .execute();
    }, duration);
  }
};

//
// GEOMETRY UTILS
//

/**
 * Returns a new `Point` where `b` is subtracted from `a`.
 */
const subtract = (a, b) => {
  return { x: a.x - b.x, y: a.y - b.y };
};

/**
 * Returns the distance between two points.
 */
export const pointDistance = (a, b) => {
  var delta = subtract(a, b);
  return Math.sqrt(delta.x * delta.x + delta.y * delta.y);
};

//
// CAMERA UTILS
//
// const up = {
//   x: 0,
//   y: 1,
//   z: 0,
// };

export const updateCamera = async (position, viewerRef) => {
  const viewer = viewerRef || document.querySelector('#viewer');
  const scene = await viewer.scene();
  const camera = scene.camera();
  return camera.update(position).render();
};

// var timer;

// const rotateOff = () => {
//   if (timer !== undefined) {
//     clearTimeout(timer);
//     timer = undefined;
//   }
// };

// const rotate = (degrees, rate) => {
//   rotateOff();
//   timer = setTimeout(async () => {
//     const scene = await viewer.scene();
//     const camera = scene.camera();
//     await camera
//       .rotateAroundAxis((degrees * Math.PI) / 180, up)
//       .render();
//     rotate(degrees, rate);
//   }, rate);
// };

// const rotateOn = () => {
//   rotate(1, 1000 / 30);
// };

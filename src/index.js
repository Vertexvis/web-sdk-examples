import { applyPolyfills, defineCustomElements } from '@vertexvis/viewer/loader';
import { Vector3 } from '@vertexvis/geometry';
import {
  addMouseFeedbackControls,
  clearMaterialOverrides,
  getHitsAtPosition,
  getOuterPosition,
  hideOverlay,
  highlightSceneItem,
  interactionApiAdapter,
  moveOverlay,
  setOverlay,
  showOnlySceneItemById,
  showOverlay,
  showSceneItemById,
  showSceneItems,
} from './viewer-helpers.js';
import { getNameforSceneItem, sceneItemIds } from './scene-data.js';
import { sceneItemList } from './scene-items.js';
require('./index.css');

applyPolyfills()
  .then(() => defineCustomElements(window))
  .then(() => main());

// function main() {
//   const viewer = document.querySelector('#viewer');
//   viewer.load('urn:vertexvis:stream-key:NJzBRaqssV_qCHr-TMpX51gUETeNHK51mXYF');
// }

// document.addEventListener('DOMContentLoaded', () => {
//   main();
// });

const camerasEqual = (camera1, camera2) => {
  return (
    Vector3.isEqual(camera1.position, camera2.position) &&
    Vector3.isEqual(camera1.lookAt, camera2.lookAt) &&
    Vector3.isEqual(camera1.up, camera2.up)
  );
};

const hideSceneItemById = async (sceneItemId, viewerInstance) => {
  const viewer = viewerInstance || document.querySelector('#viewer');
  const scene = await viewer.scene();
  await scene
    .items((op) => [op.where((q) => q.withItemId(sceneItemId)).hide()])
    .execute();
  addItemToHiddenList(sceneItemId);
};

const hideSceneItems = async (sceneItemIds, viewerInstance) => {
  const viewer = viewerInstance || document.querySelector('#viewer');
  const scene = await viewer.scene();
  const itemList = [...sceneItemIds];
  while (itemList.length > 0) {
    const opIdList = itemList.splice(0, 200);
    await scene
      .items((op) =>
        opIdList.map((sceneItemId) => {
          return op.where((q) => q.withItemId(sceneItemId)).hide();
        })
      )
      .execute();
    opIdList.map((id) => addItemToHiddenList(id));
  }
};

const HIDDEN_TIMEOUT = 500;
const HIDE_UNDO_STEPS = 100;
var hiddenList = [];
var hiddenTimer;
const addItemToHiddenList = (sceneItemId) => {
  const existingIndex = hiddenList.indexOf(sceneItemId);
  if (existingIndex != -1) {
    hiddenList.splice(existingIndex, 1);
  }
  hiddenList.unshift(sceneItemId);
  if (hiddenList.length > HIDE_UNDO_STEPS) {
    hiddenList.length = HIDE_UNDO_STEPS;
  }
  if (hiddenTimer !== undefined) {
    clearTimeout(hiddenTimer);
  }
  hiddenTimer = setTimeout(() => {
    refreshHiddenList();
  }, HIDDEN_TIMEOUT);
};

const refreshHiddenList = () => {
  const hiddenListContainer = document.getElementById('hidden-list-container');
  hiddenListContainer.innerHTML = renderHiddenList(hiddenList);
};

var currentSceneId;
var targetItemIndex = 0;
var currentItemIndex = 0;
var pendingItemIndex = -1;

const itemUpdatePending = () => {
  return pendingItemIndex > -1;
};

const setTargetItem = (index) => {
  // console.log(`setTargetItem [index=${index}]`);
  const newTargetIndex = Math.max(index, 0);
  if (newTargetIndex !== targetItemIndex) {
    targetItemIndex = newTargetIndex;
    if (!itemUpdatePending()) {
      updateItemView();
    }
  }
};

const updateItemView = async () => {
  if (itemUpdatePending()) {
    // console.log(
    //   `updateItemView -- update pending [pendingItemIndex=${pendingItemIndex}]`
    // );
    return;
  }
  if (targetItemIndex !== currentItemIndex) {
    if (targetItemIndex > currentItemIndex) {
      pendingItemIndex = Math.min(targetItemIndex, currentItemIndex + 200);
      // console.log(`updateItemView [pendingItemIndex=${pendingItemIndex}]`);
      // hide items
      const itemsToHide = sceneItemList.slice(
        currentItemIndex,
        pendingItemIndex
      );
      // console.log(`updateItemView [hiding ${itemsToHide.length} items]`);
      await hideSceneItems(itemsToHide);
    } else if (targetItemIndex < currentItemIndex) {
      pendingItemIndex = Math.max(targetItemIndex, currentItemIndex - 200);
      // console.log(`updateItemView [pendingItemIndex=${pendingItemIndex}]`);
      // show items
      const itemsToShow = sceneItemList.slice(
        pendingItemIndex,
        currentItemIndex
      );
      // console.log(`updateItemView [showing ${itemsToShow.length} items]`);
      await showSceneItems(itemsToShow);
    }
    currentItemIndex = pendingItemIndex;
    pendingItemIndex = -1;
  } else {
    // console.log(
    //   `updateItemView -- no update needed [currentItemIndex=${currentItemIndex}]`
    // );
    return;
  }
  // rerun
  setTimeout(() => {
    updateItemView();
  }, 0);
};

var viewerContainer;
var viewer;
var viewer2;
var hiddenListContainer;
var btnShowLast;
var btnShowAll;
var btnSelectPart;
var rangeInput;

const AUTO_HIDE_TRANSPARENT = true;

export async function main() {
  viewerContainer = document.getElementById('viewer-container');
  viewer = document.getElementById('viewer');
  viewer2 = document.getElementById('viewer2');
  hiddenListContainer = document.getElementById('hidden-list-container');
  btnShowLast = document.getElementById('show-last-button');
  btnShowAll = document.getElementById('show-all-button');
  btnSelectPart = document.getElementById('select-part-button');
  rangeInput = document.getElementById('itemRange');


  // attach listeners
  viewer.addEventListener('tap', tapHandler);
  hiddenListContainer.addEventListener('click', hiddenListClickHandler);
  btnShowLast.addEventListener('click', showLastClickHandler);
  btnShowAll.addEventListener('click', showAllClickHandler);
  btnSelectPart.addEventListener('click', focusPartHandler);
  rangeInput.addEventListener('input', (event) => {
    setTargetItem(641 - event.target.value);
  });

  // set viewer configs
  viewer.config = {
    flags: {
      throttleFrameDelivery: true,
      adaptiveRendering: true,
    },
  };

  viewer2.config = {
    flags: {
      throttleFrameDelivery: true,
      adaptiveRendering: true,
    },
  };

  // attach listeners
  viewer.addEventListener('tap', tapHandler);
  hiddenListContainer.addEventListener('click', hiddenListClickHandler);
  btnShowLast.addEventListener('click', showLastClickHandler);
  btnShowAll.addEventListener('click', showAllClickHandler);

  // load initial scenes

  // ENGINE
  const sceneKey =
    'urn:vertexvis:stream-key:NJzBRaqssV_qCHr-TMpX51gUETeNHK51mXYF';
  currentSceneId = 'c9605add-9a7d-4d0a-bea9-aa7bbacb4a05';

  // LWL
  // const sceneKey =
  // 'urn:vertexvis:stream-key:9b2lA--8r94tB8f3zvIuAauWgfY88GNA26nf';
  // currentSceneId = '7b155662-6e78-4f64-8202-fbdbeaaab55d';

  // Ventilator
  // const sceneKey =
  //   'urn:vertexvis:stream-key:11TyvsJ-2kFtRP9B3nAoyLiKksa-_se21ZUK';
  // currentSceneId = 'ef017b34-1a96-4484-8065-88c17ff89b3c';

  await Promise.all([viewer.load(sceneKey), viewer2.load(sceneKey)]);

  viewerContainer.style.opacity = 1.0;
  viewer.style.opacity = 0.7;

  // patch viewer 1 interaction handlers
  const viewerHandlers = await viewer.getInteractionHandlers();
  viewerHandlers.map((h) => {
    h.interactionApi = interactionApiAdapter(
      h.interactionApi,
      beginInteractionHandler,
      endInteractionHandler
    );
  });

  // if (!AUTO_HIDE_TRANSPARENT) {
  const cloneHandlers = await viewer2.getInteractionHandlers();
  cloneHandlers.map((h) => {
    h.dispose();
    viewer.registerInteractionHandler(h);
    viewer2.registerInteractionHandler(h);
  });
  // }

  // addMouseFeedbackControls();
}

function beginInteractionHandler() {
  if (AUTO_HIDE_TRANSPARENT) {
    viewer.style.opacity = 1.0;
  }
}

async function endInteractionHandler() {
  const scene1 = await viewer.scene();
  const camera1 = scene1.frame.sceneAttributes.camera;
  const scene2 = await viewer2.scene();
  const camera2 = scene2.frame.sceneAttributes.camera;
  if (!camerasEqual(camera1, camera2)) {
    const camera = scene2.camera();
    camera.update(camera1).render();
  }
  setTimeout(async () => {
    const scene1 = await viewer.scene();
    const camera1 = scene1.frame.sceneAttributes.camera;
    const scene2 = await viewer2.scene();
    const camera2 = scene2.frame.sceneAttributes.camera;
    if (!camerasEqual(camera1, camera2)) {
      const camera = scene2.camera();
      camera.update(camera1).render();
    }
    if (AUTO_HIDE_TRANSPARENT) {
      viewer.style.opacity = 0.7;
    }
  }, 500);
}

const DOUBLE_TAP_THRESHOLD = 500;
var tapTimer;
var lastTapPosition;
var lastTapItem;

async function tapHandler(event) {
  const { position } = event.detail;
  // if we're not already waiting for a double tap
  if (tapTimer === undefined) {
    tapTimer = setTimeout(async () => {
      tapTimer = undefined;
      if (lastTapPosition && lastTapItem) {
        const outerPosition = await getOuterPosition(position);
        setSelectedPart(lastTapItem);
        moveOverlay({ x: outerPosition.x + 20, y: outerPosition.y - 10 });
        setOverlay(renderInfoTip(getNameforSceneItem(currentSceneId, lastTapItem)));
        showOverlay(1500);
      }

      lastTapPosition = undefined;
      lastTapItem = undefined;
    }, DOUBLE_TAP_THRESHOLD);
  }
  if (lastTapPosition !== undefined) {
    let itemId;
    if (lastTapItem === undefined) {
      const hits = await getHitsAtPosition(position);
      if (hits) {
        itemId = lastTapItem = hits[0].sceneItemId;
      }
    } else {
      itemId = lastTapItem;
    }
    if (itemId !== undefined) {
      hideSceneItemById(itemId);
      hideOverlay();
    }
    setSelectedPart(undefined);
    tapTimer = undefined;
    lastTapPosition = undefined;
    lastTapItem = undefined;
  } else {
    lastTapPosition = position;
    const outerPosition = await getOuterPosition(position);
    const hits = await getHitsAtPosition(position);
    if (hits) {
      const hitItemId = hits[0].sceneItemId;
      lastTapItem = hitItemId;
      console.log(`'${hitItemId}',`);
      if (event.detail.shiftKey) {
        hideSceneItemById(hitItemId);
      }
      // } else {
      //   setSelectedPart(hitItemId);
      //   moveOverlay({ x: outerPosition.x + 20, y: outerPosition.y - 10 });
      //   setOverlay(renderInfoTip(getNameforSceneItem(currentSceneId, hitItemId)));
      //   showOverlay(1500);
      // }
    } else {
      hideOverlay();
      setSelectedPart(null);
    }
  }
}

async function hiddenListClickHandler(event) {
  const sceneItemId = event.target.name;
  if (sceneItemId) {
    await showSceneItemById(sceneItemId);
    setSelectedPart(sceneItemId);

    const hiddenIndex = hiddenList.indexOf(sceneItemId);
    if (hiddenIndex !== -1) {
      hiddenList.splice(hiddenIndex, 1);
      refreshHiddenList();
    }
  }
}

async function showLastClickHandler(event) {
  if (hiddenList.length === 0) {
    return;
  }
  const sceneItemId = hiddenList.shift();
  if (sceneItemId) {
    await showSceneItemById(sceneItemId);
    setSelectedPart(sceneItemId);
    refreshHiddenList();
  }
}

async function showAllClickHandler(event) {
  window.location.reload();
}

async function focusPartHandler(event) {
  if (selectedPartId !== undefined) {
    await showOnlySceneItemById(selectedPartId);
    viewer.style.opacity = 0.85;
  }
}

var selectedPartId;
function setSelectedPart(sceneItemId) {
  if (selectedPartId && selectedPartId !== sceneItemId) {
    clearMaterialOverrides(selectedPartId);
  }
  selectedPartId = sceneItemId;
  if (selectedPartId) {
    highlightSceneItem(selectedPartId, '#fccc04', -1, false);
    const partName = getNameforSceneItem(currentSceneId, selectedPartId);
    setStatusBar(`<b>Selected Part: </b>${partName}`);
  } else {
    setStatusBar(``);
  }
}

const setStatusBar = (msg) => {
  const statusContainer = document.getElementById('statusbar');
  statusContainer.innerHTML = `<p>${msg}</p>`;
};

const renderInfoTip = (message) => {
  return `<div class="max-w-2xl w-full bg-black shadow-md rounded-md pointer-events-auto">
    <div class="rounded-md shadow overflow-hidden">
      <div class="p-3">
        <div class="flex items-center">
          <div class="flex-1 flex justify-between">
            <p class="flex-1 text-lg leading-5 font-semibold text-gray-100">
              ${message || ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
};

const renderHiddenList = (sceneItemIds) => {
  return (
    `<ul>` +
    sceneItemIds
      .map((sceneItemId) => {
        return `<li>
      <a href="#" name="${sceneItemId}" class="block cursor-pointer border bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
        <div class="px-3 py-8 pointer-events-none">
          <div class="flex items-center justify-between pointer-events-none">
            <div class="text-2xl leading-5 font-medium text-gray-600 truncate pointer-events-none">
              ${getNameforSceneItem(currentSceneId, sceneItemId)}
            </div>
          </div>
        </div>
      </a>
    </li>`;
      })
      .join('') +
    `</ul>`
  );
};

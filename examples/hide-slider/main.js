import {
  getHitsAtPosition,
  getOuterPosition,
  hideOverlay,
  hideSceneItemById,
  hideSceneItems,
  highlightSceneItem,
  moveOverlay,
  setOverlay,
  showOverlay,
  showSceneItems,
} from '../viewer-helpers.js';
import { getPartNameforSceneItem } from './scene-data.js';
import { sceneItemList } from './scene-items.js';

document.addEventListener('DOMContentLoaded', () => {
  main();
});

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

async function main() {
  const viewer = document.querySelector('vertex-viewer');
  await viewer.load(
    'urn:vertexvis:stream-key:NJzBRaqssV_qCHr-TMpX51gUETeNHK51mXYF'
  );
  viewer.addEventListener('tap', tapHandler);

  var rangeInput = document.getElementById('itemRange');
  rangeInput.addEventListener('input', (event) => {
    setTargetItem(event.target.value);
  });
}

async function tapHandler(event) {
  const { position } = event.detail;
  const outerPosition = await getOuterPosition(position);
  const hits = await getHitsAtPosition(position);
  if (hits) {
    const hitItemId = hits[0].sceneItemId;
    console.log(`'${hitItemId}',`);
    if (event.detail.shiftKey) {
      hideSceneItemById(hitItemId);
    } else {
      await highlightSceneItem(hitItemId, '#fccc04', 1500);
      moveOverlay({ x: outerPosition.x + 20, y: outerPosition.y - 10 });
      setOverlay(
        renderInfoTip(
          getPartNameforSceneItem(
            'c9605add-9a7d-4d0a-bea9-aa7bbacb4a05',
            hitItemId
          )
        )
      );
      showOverlay(2000);
    }
  } else {
    hideOverlay();
  }
}

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

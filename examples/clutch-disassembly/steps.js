import {
  pointDistance,
  getHitsAtPosition,
  getOuterPosition,
  moveOverlay,
  setOverlay,
  showOverlay,
  hideOverlay,
  highlightSceneItem,
  hideSceneItemById,
  showAll,
} from '../viewer-helpers.js';

import * as UIHelpers from './ui-helpers.js';
import { getPartNameforSceneItem, sceneData } from './scene-data.js';

const COLOR_GREEN = '#008000';
const COLOR_YELLOW = '#fccc04';
const COLOR_RED = '#960202';

const SCREWDRIVER_POINT = {
  x: 34.500003814697266,
  y: 74.93819427490234,
  z: 30.806074142456055,
};
const DISTANCE_THRESHOLD_MM = 3.2;

const step0 = {
  title: 'Transmission Parts',
  instructions:
    'Tap on parts to see their names. SHIFT + tap hides parts. CTRL + tap to show all.',
  scene: sceneData['09faec17-ae6b-4ad1-aaeb-c1deb25efcec'],
  operationSets: [],
  tapHandler: async (event) => {
    const { position } = event.detail;
    const outerPosition = await getOuterPosition(position);
    const hits = await getHitsAtPosition(position);
    if (hits) {
      const hitItemId = hits[0].sceneItemId;
      if (event.detail.shiftKey) {
        hideSceneItemById(hitItemId);
      } else if (event.detail.ctrlKey) {
        showAll();
      } else {
        await highlightSceneItem(hitItemId, COLOR_YELLOW, 1500);
        moveOverlay({ x: outerPosition.x + 20, y: outerPosition.y - 10 });
        setOverlay(
          UIHelpers.renderInfoTip(
            getPartNameforSceneItem(
              '09faec17-ae6b-4ad1-aaeb-c1deb25efcec',
              hitItemId
            )
          )
        );
        showOverlay(2000);
      }
    } else {
      hideOverlay();
    }
  },
};

const step1 = {
  title: 'Clutch Parts',
  instructions:
    'Tap on parts to see their names. SHIFT + tap hides parts. CTRL + tap to show all.',
  scene: sceneData['89491e59-eba3-44c0-bb84-48ddb24e139a'],
  operationSets: [],
  tapHandler: async (event) => {
    const { position } = event.detail;
    const outerPosition = await getOuterPosition(position);
    const hits = await getHitsAtPosition(position);
    if (hits) {
      const hitItemId = hits[0].sceneItemId;
      if (event.detail.shiftKey) {
        hideSceneItemById(hitItemId);
      } else if (event.detail.ctrlKey) {
        showAll();
      } else {
        await highlightSceneItem(hitItemId, COLOR_YELLOW, 1500);
        moveOverlay({ x: outerPosition.x + 20, y: outerPosition.y - 10 });
        setOverlay(
          UIHelpers.renderInfoTip(
            getPartNameforSceneItem(
              '89491e59-eba3-44c0-bb84-48ddb24e139a',
              hitItemId
            )
          )
        );
        showOverlay(2000);
      }
    } else {
      hideOverlay();
    }
  },
};

const step2 = {
  title: 'Snap Ring Removal',
  instructions: 'Tap on the appropriate tool to remove the snap ring.',
  scene: sceneData['77f3dad7-0591-4529-b8b4-a8063c82cb9e'],
  operationSets: [],
  tapHandler: async (event) => {
    const { position } = event.detail;
    const outerPosition = await getOuterPosition(position);
    const hits = await getHitsAtPosition(position);
    console.log('tap=', event);
    console.log('hits=', hits);
    if (hits) {
      const hitItemId = hits[0].sceneItemId;
      const hitItemSuppliedId =
        sceneData['77f3dad7-0591-4529-b8b4-a8063c82cb9e'].items[hitItemId]
          .suppliedId;
      moveOverlay({ x: outerPosition.x + 20, y: outerPosition.y - 10 });
      const isSuccess = hitItemSuppliedId === 'screwdriver';
      setOverlay(
        isSuccess
          ? UIHelpers.renderSuccessAlert(
            `That's correct!`,
            `A flathead screwdriver is a good option for removing the snap ring.`
          )
          : UIHelpers.renderWarningAlert(
            `Oops! Try again.`,
            `Please select the appropriate appropriate tool to remove the snap ring.`
          )
      );
      showOverlay(2000);
    } else {
      hideOverlay();
    }
  },
};

const step3 = {
  title: 'Snap Ring Removal',
  instructions:
    'Tap on the location where the screwdriver should be used to remove the snap ring.',
  scene: sceneData['89491e59-eba3-44c0-bb84-48ddb24e139a'],
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
      ],
      query: {
        type: 'suppliedId',
        values: ['screwdriver-r1'],
      },
    },
  ],
  tapHandler: async (event) => {
    const { position } = event.detail;
    const outerPosition = await getOuterPosition(position);
    const hits = await getHitsAtPosition(position);
    console.log('tap=', event);
    console.log('hits=', hits);
    if (hits) {
      const hitPoint = hits[0].hitPoint;
      const hitDistance = pointDistance(SCREWDRIVER_POINT, hitPoint);
      moveOverlay({ x: outerPosition.x + 20, y: outerPosition.y - 10 });
      const isSuccess = hitDistance < DISTANCE_THRESHOLD_MM;
      setOverlay(
        isSuccess
          ? UIHelpers.renderSuccessAlert(
            `That's the spot!`,
            `Next, remove the snap ring with the screwdriver.`
          )
          : UIHelpers.renderWarningAlert(
            `Oops! Try again.`,
            `Please select the appropriate location to place the screwdriver for snap ring removal.`
          )
      );
      showOverlay(2000);
    } else {
      hideOverlay();
    }
  },
};
const step4 = {
  title: 'Snap Ring Removal',
  instructions: 'Use the screwdriver to remove the snap ring.',
  scene: sceneData['a39a58b0-8393-48c2-ba76-44b4b48e9a77'],
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
      ],
      query: {
        type: 'suppliedId',
        values: [
          'screwdriver',
          'FC00AAA48232/001_r1',
          'FC00AAA48232/001_r2',
          'FC00AAA48232/001_r3',
          'FC00AAA48232/001_r4',
        ],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'suppliedId',
        values: ['FC00AAA48232/001', 'screwdriver-r1'],
      },
    },
  ],
  duration: 2000,
};
const step5 = {
  title: 'Snap Ring Removal',
  instructions: 'Use the screwdriver to remove the snap ring.',
  scene: sceneData['a39a58b0-8393-48c2-ba76-44b4b48e9a77'],
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
      ],
      query: {
        type: 'suppliedId',
        values: ['FC00AAA48232/001', 'screwdriver-r1'],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'suppliedId',
        values: ['FC00AAA48232/001_r1', 'screwdriver'],
      },
    },
  ],
  duration: 0,
};
const step6 = {
  title: 'Snap Ring Removal',
  instructions: 'Use the screwdriver to remove the snap ring.',
  scene: sceneData['a39a58b0-8393-48c2-ba76-44b4b48e9a77'],
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
      ],
      query: {
        type: 'suppliedId',
        values: ['FC00AAA48232/001_r1'],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'suppliedId',
        values: ['FC00AAA48232/001_r2'],
      },
    },
  ],
  duration: 0,
};
const step7 = {
  title: 'Snap Ring Removal',
  instructions: 'Use the screwdriver to remove the snap ring.',
  scene: sceneData['a39a58b0-8393-48c2-ba76-44b4b48e9a77'],
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
      ],
      query: {
        type: 'suppliedId',
        values: ['FC00AAA48232/001_r2'],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'suppliedId',
        values: ['FC00AAA48232/001_r3'],
      },
    },
  ],
  duration: 0,
};
const step8 = {
  title: 'Snap Ring Removal',
  instructions: 'Use the screwdriver to remove the snap ring.',
  scene: sceneData['a39a58b0-8393-48c2-ba76-44b4b48e9a77'],
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
      ],
      query: {
        type: 'suppliedId',
        values: ['FC00AAA48232/001_r3'],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'suppliedId',
        values: ['FC00AAA48232/001_r4'],
      },
    },
  ],
  duration: 500,
};

const step9 = {
  title: 'Snap Ring Removal',
  instructions: 'Use the screwdriver to remove the snap ring.',
  scene: sceneData['a39a58b0-8393-48c2-ba76-44b4b48e9a77'],
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
      ],
      query: {
        type: 'suppliedId',
        values: ['screwdriver'],
      },
    },
  ],
  duration: 2000,
  nextIndex: 4,
};

// const step10 = {
//   title: 'Remove Next Parts',
//   instructions: 'Remove the other parts next.',
//   scene: sceneData['d0bbd1da-559d-4a9d-ad8c-9752c90272a2'],
//   operationSets: [],
// };

export default [
  step0,
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
  step8,
  step9,
  // step10,
];

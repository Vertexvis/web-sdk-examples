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
} from './viewer-helpers.js';

import * as UIHelpers from './ui-helpers.js';
import { getPartNameforSceneItem, sceneData } from './scene-data.js';
import { nextStep, setStep } from './instructions.js';

const COLOR_GREEN = '#008000';
const COLOR_YELLOW = '#fccc04';
const COLOR_RED = '#960202';

const SCENE_ID_LIST = [
  '89491e59-eba3-44c0-bb84-48ddb24e139a',
  '77f3dad7-0591-4529-b8b4-a8063c82cb9e',
  'a39a58b0-8393-48c2-ba76-44b4b48e9a77',
  'fbb4fc6d-03ae-4920-af95-87ae0c43d2b0',
  'd0bbd1da-559d-4a9d-ad8c-9752c90272a2',
  '61b55e5e-473c-4882-a245-8d294dbebe73',
  '4492f7d9-8cff-4a19-b644-5911635c0d5e',
  'b01b4325-e938-42c0-84be-5a67e2d3b7ac',
  '4fec0f32-ca36-4091-b720-1cc77be59470',
  '8501b86e-10f8-45cf-a0eb-787f794140d5',
];

const SCREWDRIVER_POINT = {
  x: 34.500003814697266,
  y: 74.93819427490234,
  z: 30.806074142456055,
};
const DISTANCE_THRESHOLD_MM = 3.2;

const step1 = {
  title: 'Learn the Parts',
  instructions:
    'Tap on parts and familiarize yourself with all part names. Use SHIFT + tap to hide parts.',
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
      } else {
        highlightSceneItem(hitItemId, COLOR_YELLOW, 800);
        moveOverlay({ x: outerPosition.x + 20, y: outerPosition.y - 10 });
        setOverlay(
          UIHelpers.renderInfoTip(
            getPartNameforSceneItem(
              '89491e59-eba3-44c0-bb84-48ddb24e139a',
              hitItemId
            )
          )
        );
        showOverlay(3000);
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
      if (isSuccess) {
        setTimeout(() => nextStep(), 2000);
      }
    } else {
      hideOverlay();
    }
  },
};

const step3 = {
  title: 'Snap Ring Removal',
  instructions:
    'Tap on the location where the screwdriver should be used to remove the snap ring.',
  scene: sceneData['a39a58b0-8393-48c2-ba76-44b4b48e9a77'],
  operationSets: [],
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
      if (isSuccess) {
        setTimeout(() => nextStep(), 2000);
      }
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
          type: 'show',
        },
      ],
      query: {
        type: 'itemId',
        values: ['975f056a-e39c-4948-91cf-3b6fd1cff035'],
      },
    },
  ],
  duration: 0,
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
        values: [
          'FC00AAA48232/001',
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
        values: ['FC00AAA48232/001_r1'],
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
        values: [
          'FC00AAA48232/001',
          'FC00AAA48232/001_r1',
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
        values: [
          'FC00AAA48232/001',
          'FC00AAA48232/001_r1',
          'FC00AAA48232/001_r2',
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
        values: [
          'FC00AAA48232/001',
          'FC00AAA48232/001_r1',
          'FC00AAA48232/001_r2',
          'FC00AAA48232/001_r3',
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
        values: ['FC00AAA48232/001_r4'],
      },
    },
  ],
  duration: 0,
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
        values: [
          'FC00AAA48232/001',
          'FC00AAA48232/001_r1',
          'FC00AAA48232/001_r2',
          'FC00AAA48232/001_r3',
          'FC00AAA48232/001_r4',
        ],

      },
    }
  ],
};

// const step4 = {
//   operationSets: [
//     {
//       operations: [
//         {
//           type: 'hide',
//         },
//         {
//           type: 'clearOverrides',
//         },
//       ],
//       query: {
//         type: 'all',
//         values: [],
//       },
//     },
//     {
//       operations: [
//         {
//           type: 'show',
//         },
//       ],
//       query: {
//         type: 'itemId',
//         values: [
//           '5285ebd3-7028-403f-862a-c384da7ec687',
//           '91d46792-83dd-45e6-a08e-19c00a15151d',
//           '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
//           '2cc87a1c-2f13-45c9-9813-63f0aa3ca3b8',
//           '431a7821-a395-4f63-8a8f-76dced649f06',
//           '6810ea77-0df0-442c-a2d5-3a033e304ba1',
//           '858f4c38-7018-480f-b748-b3f14f7ea2d2',
//         ],
//       },
//     },
//     {
//       operations: [
//         {
//           type: 'materialOverride',
//           value: '#ff0000',
//         },
//       ],
//       query: {
//         type: 'itemId',
//         values: [
//           '6810ea77-0df0-442c-a2d5-3a033e304ba1',
//           '858f4c38-7018-480f-b748-b3f14f7ea2d2',
//         ],
//       },
//     },
//   ],
// };

// const step5 = {
//   operationSets: [
//     {
//       operations: [
//         {
//           type: 'hide',
//         },
//         {
//           type: 'clearOverrides',
//         },
//       ],
//       query: {
//         type: 'all',
//         values: [],
//       },
//     },
//     {
//       operations: [
//         {
//           type: 'show',
//         },
//       ],
//       query: {
//         type: 'itemId',
//         values: [
//           '5285ebd3-7028-403f-862a-c384da7ec687',
//           '91d46792-83dd-45e6-a08e-19c00a15151d',
//           '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
//           '2cc87a1c-2f13-45c9-9813-63f0aa3ca3b8',
//           '431a7821-a395-4f63-8a8f-76dced649f06',
//           '6810ea77-0df0-442c-a2d5-3a033e304ba1',
//           '858f4c38-7018-480f-b748-b3f14f7ea2d2',
//           '9d9c1df6-4453-4a50-b153-9399f0987ec0',
//           '3fbd32ab-d67b-4a92-9b3a-8e75a42eb46f',
//         ],
//       },
//     },
//     {
//       operations: [
//         {
//           type: 'materialOverride',
//           value: '#ff0000',
//         },
//       ],
//       query: {
//         type: 'itemId',
//         values: [
//           '9d9c1df6-4453-4a50-b153-9399f0987ec0',
//           '3fbd32ab-d67b-4a92-9b3a-8e75a42eb46f',
//         ],
//       },
//     },
//   ],
// };

// const step6 = {
//   operationSets: [
//     {
//       operations: [
//         {
//           type: 'hide',
//         },
//         {
//           type: 'clearOverrides',
//         },
//       ],
//       query: {
//         type: 'all',
//         values: [],
//       },
//     },
//     {
//       operations: [
//         {
//           type: 'show',
//         },
//       ],
//       query: {
//         type: 'itemId',
//         values: [
//           '5285ebd3-7028-403f-862a-c384da7ec687',
//           '91d46792-83dd-45e6-a08e-19c00a15151d',
//           '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
//           '2cc87a1c-2f13-45c9-9813-63f0aa3ca3b8',
//           '431a7821-a395-4f63-8a8f-76dced649f06',
//           '6810ea77-0df0-442c-a2d5-3a033e304ba1',
//           '858f4c38-7018-480f-b748-b3f14f7ea2d2',
//           '9d9c1df6-4453-4a50-b153-9399f0987ec0',
//           '3fbd32ab-d67b-4a92-9b3a-8e75a42eb46f',
//           '45ecbf55-2648-4d19-b154-948995d352e4',
//         ],
//       },
//     },
//     {
//       operations: [
//         {
//           type: 'materialOverride',
//           value: '#ff0000',
//         },
//       ],
//       query: {
//         type: 'itemId',
//         values: ['45ecbf55-2648-4d19-b154-948995d352e4'],
//       },
//     },
//   ],
// };

// const step7 = {
//   operationSets: [
//     {
//       operations: [
//         {
//           type: 'hide',
//         },
//         {
//           type: 'clearOverrides',
//         },
//       ],
//       query: {
//         type: 'all',
//         values: [],
//       },
//     },
//     {
//       operations: [
//         {
//           type: 'show',
//         },
//       ],
//       query: {
//         type: 'itemId',
//         values: [
//           '5285ebd3-7028-403f-862a-c384da7ec687',
//           '91d46792-83dd-45e6-a08e-19c00a15151d',
//           '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
//           '2cc87a1c-2f13-45c9-9813-63f0aa3ca3b8',
//           '431a7821-a395-4f63-8a8f-76dced649f06',
//           '6810ea77-0df0-442c-a2d5-3a033e304ba1',
//           '858f4c38-7018-480f-b748-b3f14f7ea2d2',
//           '9d9c1df6-4453-4a50-b153-9399f0987ec0',
//           '3fbd32ab-d67b-4a92-9b3a-8e75a42eb46f',
//           '45ecbf55-2648-4d19-b154-948995d352e4',
//           'dc173751-caf4-4875-8af1-60e25219f712',
//           '9a7b9526-81ae-4faa-a08f-b9ac2b7f73a2',
//         ],
//       },
//     },
//     {
//       operations: [
//         {
//           type: 'materialOverride',
//           value: '#ff0000',
//         },
//       ],
//       query: {
//         type: 'itemId',
//         values: [
//           'dc173751-caf4-4875-8af1-60e25219f712',
//           '9a7b9526-81ae-4faa-a08f-b9ac2b7f73a2',
//         ],
//       },
//     },
//   ],
// };

// const step8 = {
//   operationSets: [
//     {
//       operations: [
//         {
//           type: 'hide',
//         },
//         {
//           type: 'clearOverrides',
//         },
//       ],
//       query: {
//         type: 'all',
//         values: [],
//       },
//     },
//     {
//       operations: [
//         {
//           type: 'show',
//         },
//       ],
//       query: {
//         type: 'itemId',
//         values: [
//           '5285ebd3-7028-403f-862a-c384da7ec687',
//           '91d46792-83dd-45e6-a08e-19c00a15151d',
//           '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
//           '2cc87a1c-2f13-45c9-9813-63f0aa3ca3b8',
//           '431a7821-a395-4f63-8a8f-76dced649f06',
//           '6810ea77-0df0-442c-a2d5-3a033e304ba1',
//           '858f4c38-7018-480f-b748-b3f14f7ea2d2',
//           '9d9c1df6-4453-4a50-b153-9399f0987ec0',
//           '3fbd32ab-d67b-4a92-9b3a-8e75a42eb46f',
//           '45ecbf55-2648-4d19-b154-948995d352e4',
//           'dc173751-caf4-4875-8af1-60e25219f712',
//           '9a7b9526-81ae-4faa-a08f-b9ac2b7f73a2',
//         ],
//       },
//     },
//   ],
// };

export default [step1, step2, step3, step4, step5, step6, step7, step8, step9];

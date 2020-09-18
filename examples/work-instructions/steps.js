function showAndHighlight(hexColor) {
  return [
    {
      type: 'highlight',
      value: hexColor,
    },
    {
      type: 'show',
    },
  ];
}

function hideAndClearOverrides() {
  return [
    {
      type: 'hide',
    },
    {
      type: 'clearMaterialOverrides',
    },
  ];
}

function createMetadataQuery(key, value) {
  return {
    type: 'metadata',
    key,
    value,
  };
}

const step1 = {
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
      ],
      query: {
        type: 'all',
        values: [],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'itemId',
        values: ['5285ebd3-7028-403f-862a-c384da7ec687'],
      },
    },
  ],
};

const step2 = {
  operationSets: [
    {
      operations: [
        {
          type: 'show',
        },
        {
          type: 'hide',
        },
      ],
      query: {
        type: 'all',
        values: [],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'itemId',
        values: [
          '5285ebd3-7028-403f-862a-c384da7ec687',
          '91d46792-83dd-45e6-a08e-19c00a15151d',
          '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
        ],
      },
    },
    {
      operations: [
        {
          type: 'materialOverride',
          value: '#ff0000',
        },
      ],
      query: {
        type: 'itemId',
        values: [
          '91d46792-83dd-45e6-a08e-19c00a15151d',
          '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
        ],
      },
    },
  ],
};

const step3 = {
  operationSets: [
    {
      operations: [
        {
          type: 'show',
        },
        {
          type: 'clearOverrides',
        },
        {
          type: 'hide',
        },
      ],
      query: {
        type: 'all',
        values: [],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'itemId',
        values: [
          '5285ebd3-7028-403f-862a-c384da7ec687',
          '91d46792-83dd-45e6-a08e-19c00a15151d',
          '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
          '2cc87a1c-2f13-45c9-9813-63f0aa3ca3b8',
          '431a7821-a395-4f63-8a8f-76dced649f06',
        ],
      },
    },
    {
      operations: [
        {
          type: 'materialOverride',
          value: '#ff0000',
        },
      ],
      query: {
        type: 'itemId',
        values: [
          '2cc87a1c-2f13-45c9-9813-63f0aa3ca3b8',
          '431a7821-a395-4f63-8a8f-76dced649f06',
        ],
      },
    },
  ],
};

const step4 = {
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
        {
          type: 'clearOverrides',
        },
      ],
      query: {
        type: 'all',
        values: [],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'itemId',
        values: [
          '5285ebd3-7028-403f-862a-c384da7ec687',
          '91d46792-83dd-45e6-a08e-19c00a15151d',
          '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
          '2cc87a1c-2f13-45c9-9813-63f0aa3ca3b8',
          '431a7821-a395-4f63-8a8f-76dced649f06',
          '6810ea77-0df0-442c-a2d5-3a033e304ba1',
          '858f4c38-7018-480f-b748-b3f14f7ea2d2',
        ],
      },
    },
    {
      operations: [
        {
          type: 'materialOverride',
          value: '#ff0000',
        },
      ],
      query: {
        type: 'itemId',
        values: [
          '6810ea77-0df0-442c-a2d5-3a033e304ba1',
          '858f4c38-7018-480f-b748-b3f14f7ea2d2',
        ],
      },
    },
  ],
};

const step5 = {
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
        {
          type: 'clearOverrides',
        },
      ],
      query: {
        type: 'all',
        values: [],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'itemId',
        values: [
          '5285ebd3-7028-403f-862a-c384da7ec687',
          '91d46792-83dd-45e6-a08e-19c00a15151d',
          '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
          '2cc87a1c-2f13-45c9-9813-63f0aa3ca3b8',
          '431a7821-a395-4f63-8a8f-76dced649f06',
          '6810ea77-0df0-442c-a2d5-3a033e304ba1',
          '858f4c38-7018-480f-b748-b3f14f7ea2d2',
          '9d9c1df6-4453-4a50-b153-9399f0987ec0',
          '3fbd32ab-d67b-4a92-9b3a-8e75a42eb46f',
        ],
      },
    },
    {
      operations: [
        {
          type: 'materialOverride',
          value: '#ff0000',
        },
      ],
      query: {
        type: 'itemId',
        values: [
          '9d9c1df6-4453-4a50-b153-9399f0987ec0',
          '3fbd32ab-d67b-4a92-9b3a-8e75a42eb46f',
        ],
      },
    },
  ],
};

const step6 = {
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
        {
          type: 'clearOverrides',
        },
      ],
      query: {
        type: 'all',
        values: [],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'itemId',
        values: [
          '5285ebd3-7028-403f-862a-c384da7ec687',
          '91d46792-83dd-45e6-a08e-19c00a15151d',
          '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
          '2cc87a1c-2f13-45c9-9813-63f0aa3ca3b8',
          '431a7821-a395-4f63-8a8f-76dced649f06',
          '6810ea77-0df0-442c-a2d5-3a033e304ba1',
          '858f4c38-7018-480f-b748-b3f14f7ea2d2',
          '9d9c1df6-4453-4a50-b153-9399f0987ec0',
          '3fbd32ab-d67b-4a92-9b3a-8e75a42eb46f',
          '45ecbf55-2648-4d19-b154-948995d352e4',
        ],
      },
    },
    {
      operations: [
        {
          type: 'materialOverride',
          value: '#ff0000',
        },
      ],
      query: {
        type: 'itemId',
        values: ['45ecbf55-2648-4d19-b154-948995d352e4'],
      },
    },
  ],
};

const step7 = {
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
        {
          type: 'clearOverrides',
        },
      ],
      query: {
        type: 'all',
        values: [],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'itemId',
        values: [
          '5285ebd3-7028-403f-862a-c384da7ec687',
          '91d46792-83dd-45e6-a08e-19c00a15151d',
          '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
          '2cc87a1c-2f13-45c9-9813-63f0aa3ca3b8',
          '431a7821-a395-4f63-8a8f-76dced649f06',
          '6810ea77-0df0-442c-a2d5-3a033e304ba1',
          '858f4c38-7018-480f-b748-b3f14f7ea2d2',
          '9d9c1df6-4453-4a50-b153-9399f0987ec0',
          '3fbd32ab-d67b-4a92-9b3a-8e75a42eb46f',
          '45ecbf55-2648-4d19-b154-948995d352e4',
          'dc173751-caf4-4875-8af1-60e25219f712',
          '9a7b9526-81ae-4faa-a08f-b9ac2b7f73a2',
        ],
      },
    },
    {
      operations: [
        {
          type: 'materialOverride',
          value: '#ff0000',
        },
      ],
      query: {
        type: 'itemId',
        values: [
          'dc173751-caf4-4875-8af1-60e25219f712',
          '9a7b9526-81ae-4faa-a08f-b9ac2b7f73a2',
        ],
      },
    },
  ],
};

const step8 = {
  operationSets: [
    {
      operations: [
        {
          type: 'hide',
        },
        {
          type: 'clearOverrides',
        },
      ],
      query: {
        type: 'all',
        values: [],
      },
    },
    {
      operations: [
        {
          type: 'show',
        },
      ],
      query: {
        type: 'itemId',
        values: [
          '5285ebd3-7028-403f-862a-c384da7ec687',
          '91d46792-83dd-45e6-a08e-19c00a15151d',
          '2836ac74-c2f4-4930-a4e4-9b4a2739f0e7',
          '2cc87a1c-2f13-45c9-9813-63f0aa3ca3b8',
          '431a7821-a395-4f63-8a8f-76dced649f06',
          '6810ea77-0df0-442c-a2d5-3a033e304ba1',
          '858f4c38-7018-480f-b748-b3f14f7ea2d2',
          '9d9c1df6-4453-4a50-b153-9399f0987ec0',
          '3fbd32ab-d67b-4a92-9b3a-8e75a42eb46f',
          '45ecbf55-2648-4d19-b154-948995d352e4',
          'dc173751-caf4-4875-8af1-60e25219f712',
          '9a7b9526-81ae-4faa-a08f-b9ac2b7f73a2',
        ],
      },
    },
  ],
};

const step1old = {
  // A set of operations to perform on the resulting bom item found by the
  // queries provided as part of this step.
  // See https://developer.vertexvis.com/api#operation/bulkOperation for
  // the complete list of bom operations that are possible.
  operations: showAndHighlight('#ff0000'),
  // Each of these queries represents a metadata key/value pair that will
  // resolve to a single bom item to apply the provided operation set to.
  // Note: metadata queries that result in more than one bom item will
  // pick the first result found to apply the operation set to.
  queries: [
    createMetadataQuery('MetadataKey0', 'MetadataValue0'),
    createMetadataQuery('MetadataKey1', 'MetadataValue1'),
  ],
  // A camera state to apply for this step.
  camera: {
    position: { x: -1, y: 0, z: 0 },
    lookat: { x: 0, y: 0, z: 0 },
    upvector: { x: 0, y: 1, z: 0 },
  },
  // Fits the camera to the bounding box of the visible items in the scene.
  viewAll: true,
};

const step2old = {
  operations: showAndHighlight('#ff0000'),
  queries: [createMetadataQuery('MetadataKey2', 'MetadataValue2')],
  camera: {
    position: { x: 0, y: 1, z: 0 },
    lookat: { x: 0, y: 0, z: 0 },
    upvector: { x: 0, y: 0, z: 1 },
  },
  viewAll: true,
};

const step3old = {
  operations: showAndHighlight('#ff0000'),
  queries: [createMetadataQuery('MetadataKey3', 'MetadataValue3')],
  camera: {
    position: { x: 1, y: 1, z: 1 },
    lookat: { x: 0, y: 0, z: 0 },
    upvector: { x: 0, y: 0, z: 1 },
  },
  viewAll: true,
};

export default [step1, step2, step3, step4, step5, step6, step7, step8];

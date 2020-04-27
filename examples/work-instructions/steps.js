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

function createMetadataQuery(key, value) {
  return {
    type: 'metadata',
    key,
    value,
  };
}

const step1 = {
  operations: showAndHighlight('#ff0000'),
  queries: [
    createMetadataQuery('MetadataKey0', 'MetadataValue0'),
    createMetadataQuery('MetadataKey1', 'MetadataValue1'),
  ],
  camera: {
    position: { x: -1, y: 0, z: 0 },
    lookat: { x: 0, y: 0, z: 0 },
    upvector: { x: 0, y: 1, z: 0 },
  },
  viewAll: true,
};

const step2 = {
  operations: showAndHighlight('#ff0000'),
  queries: [createMetadataQuery('MetadataKey2', 'MetadataValue2')],
  camera: {
    position: { x: 0, y: 1, z: 0 },
    lookat: { x: 0, y: 0, z: 0 },
    upvector: { x: 0, y: 0, z: 1 },
  },
  viewAll: true,
};

const step3 = {
  operations: showAndHighlight('#ff0000'),
  queries: [createMetadataQuery('MetadataKey3', 'MetadataValue3')],
  camera: {
    position: { x: 1, y: 1, z: 1 },
    lookat: { x: 0, y: 0, z: 0 },
    upvector: { x: 0, y: 0, z: 1 },
  },
  viewAll: true,
};

export default [step1, step2, step3];

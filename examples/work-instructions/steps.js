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

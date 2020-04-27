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
};

const step2 = {
  operations: showAndHighlight('#ff0000'),
  queries: [createMetadataQuery('MetadataKey2', 'MetadataValue2')],
};

const step3 = {
  operations: showAndHighlight('#ff0000'),
  queries: [createMetadataQuery('MetadataKey3', 'MetadataValue3')],
};

export default [step1, step2, step3];

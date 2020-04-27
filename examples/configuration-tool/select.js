function applyQuery(selector, queryKey, value) {
  return queryKey != null
    ? selector.withMetadata(queryKey, value)
    : selector.withItemId(value);
}

export function createSelectConfigurationOption(viewer, queryKey) {
  let previousValue;

  return async function (event) {
    const scene = await viewer.scene();

    if (previousValue) {
      const previousHidden = scene
        .clearAllHighlights()
        .hide((selector) => applyQuery(selector, queryKey, previousValue));

      if (event.target.value !== '') {
        await previousHidden
          .show((selector) =>
            applyQuery(selector, queryKey, event.target.value)
          )
          .highlight('#ff0000', (selector) =>
            applyQuery(selector, queryKey, event.target.value)
          )
          .execute();
      } else {
        await previousHidden.execute();
      }
    } else {
      await scene
        .clearAllHighlights()
        .show((selector) => applyQuery(selector, queryKey, event.target.value))
        .highlight('#ff0000', (selector) =>
          applyQuery(selector, queryKey, event.target.value)
        )
        .execute();
    }
    previousValue = event.target.value;
  };
}

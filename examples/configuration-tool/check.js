function applyQuery(selector, query) {
  return query.type === 'metadata' ? selector.withMetadata(query.key, query.value) : selector.withItemId(query.value);
}

export function createCheckConfigurationOption(viewer, query) {
  let visible = false;

  return async function () {
    const scene = await viewer.scene();

    if (visible) {
      await scene.hide(selector => applyQuery(selector, query)).execute();

      visible = false;
    } else {
      await scene.show(selector => applyQuery(selector, query)).execute();

      visible = true;
    }
  }
}
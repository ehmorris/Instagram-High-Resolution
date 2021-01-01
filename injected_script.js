(function() {
  const flattenObject = obj => {
    const flattened = {};

    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(flattened, flattenObject(obj[key]));
      } else {
        flattened[key] = obj[key];
      }
    });

    return flattened;
  };

  const contentScriptChannel = new BroadcastChannel(
    'HRDFI_extension_script_communication_channel'
  );

  const flatAdditionalData = flattenObject(window.__additionalData);
  const flatSharedData = flattenObject(window._sharedData);
  contentScriptChannel.postMessage({
    video_url: flatAdditionalData.video_url || flatSharedData.video_url,
  });
  contentScriptChannel.close();
})();

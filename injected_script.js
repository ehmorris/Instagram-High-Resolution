(function() {
  const filterForVideoURL = obj => {
    const flattened = [];

    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(flattened, filterForVideoURL(obj[key]));
      } else if (key === 'video_url') {
        flattened.push(obj[key]);
      }
    });

    return flattened;
  };

  const allVideoURLs = filterForVideoURL(window.__additionalData).concat(
    filterForVideoURL(window._sharedData)
  );

  const contentScriptChannel = new BroadcastChannel(
    'HRDFI_extension_script_communication_channel'
  );

  contentScriptChannel.postMessage({
    video_url: allVideoURLs[0],
  });

  contentScriptChannel.close();
})();

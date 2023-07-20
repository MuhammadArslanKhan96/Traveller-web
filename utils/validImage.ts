export function isValidImageURL(url: string, callback: any) {
  const img = new Image();

  img.onload = function () {
    // Image has loaded successfully, so it's a valid image URL
    callback(true);
  };

  img.onerror = function () {
    // Image failed to load, so it's an invalid image URL
    callback(false);
  };

  img.src = url;
}

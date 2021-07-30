export function deepCopy(target) {
  if (typeof target == "object") {
    const result = Array.isArray(target) ? [] : {};
    for (const key in target) {
      if (typeof target[key] == "object") {
        result[key] = deepCopy(target[key]);
      } else {
        result[key] = target[key];
      }
    }

    return result;
  }

  return target;
}

export function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

export function $(selector) {
  return document.querySelector(selector);
}

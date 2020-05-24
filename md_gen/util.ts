/**
 * Sets a value for a path in an object
 *
 * @param object the object to set in
 * @param path the path to the value to set
 * @param value the value to set
 */
export function setIn(object: Record<string, any>, path: string, value: any) {
  if (typeof object !== "object" || !object) {
    throw new Error(`${JSON.stringify(object)} is not an object`);
  }

  const stack = path.split(".");
  let name = stack.shift();
  let currentObject = object;

  // Go up to the before last path
  while (name && stack.length) {
    // Set an empty object if no value exists
    if (!Object.hasOwnProperty.call(currentObject, name)) {
      currentObject[name] = {};
    } else if (
      typeof currentObject[name] !== "object" ||
      !currentObject[name]
    ) {
      throw new Error(
        `${JSON.stringify(
          currentObject
        )} already has non object property "${name}": ${JSON.stringify(
          currentObject[name]
        )}. Cannot set nested value for ${JSON.stringify(path)}`
      );
    }

    // Save the current value
    currentObject = currentObject[name];

    name = stack.shift();
  }

  // For the final name in the path, set the value
  if (name) {
    currentObject[name] = value;
  }
}

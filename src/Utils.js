/**
 * @class Utils
 *
 * This class provides useful methods
 */
class Utils {
  /**
   * Transform a string into CamelCase.
   *
   * @param {string} str The input string.
   * @returns {string} The transformed string.
   */
  static camelize(str) {
    if(!str) return str;

    return str.replace(/_(.)/g, (match, chr) => chr.toUpperCase());
  }
}

export default Utils;

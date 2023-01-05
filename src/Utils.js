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

  static buildQueryParams(params) {
    let getPairs = (obj, keys = []) => {
      return Object.entries(obj).reduce((pairs, [key, value]) => {
        if (typeof value === 'object')
          pairs.push(...getPairs(value, [...keys, key]));
        else
          pairs.push([[...keys, key], value]);
        return pairs;
      }, []);
    };

    return getPairs(params).map(([[key0, ...keysRest], value]) => {
      return `${key0}${keysRest.map(a => `[${a}]`).join('')}=${value}`;
    }).join('&');
  }
}

export default Utils;

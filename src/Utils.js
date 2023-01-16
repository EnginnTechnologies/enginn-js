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
    if (!params) return '';

    let getPairElements = (key, value, keys = []) => {
      if (typeof value === 'object')
        return getPairs(value, [...keys, key]);
      else
        return [[[...keys, key], value]];
    };
    let getPairs = (obj, keys = []) => {
      if (Array.isArray(obj)) {
        return obj.reduce((pairs, value) => {
          return pairs.concat(getPairElements('', value, keys));
        }, []);
      } else {
        return Object.entries(obj).reduce((pairs, [key, value]) => {
          return pairs.concat(getPairElements(key, value, keys));
        }, []);
      }
    };

    return getPairs(params).map(([[key0, ...keysRest], value]) => {
      return `${key0}${keysRest.map(a => `[${a}]`).join('')}=${value}`;
    }).join('&');
  }
}

export default Utils;

import Resource from './Resource.js';

/**
 * @class Take
 * @see {@link Resource}
 */
class Take extends Resource {
  /**
   * @see {@link Resource#pathName}
   */
  static pathName = 'takes';

  /**
   * @see {@link Resource#resourceName}
   */
  static resourceName = 'take';
}

export default Take;

import LinesIndex from './LinesIndex.js';
import Resource from './Resource.js';
import TakesIndex from './TakesIndex.js';

/**
 * @class Character
 * @see {@link Resource}
 */
class Character extends Resource {
  /**
   * @see {@link Resource#pathName}
   */
  static pathName = 'characters';

  /**
   * @see {@link Resource#resourceName}
   */
  static resourceName = 'character';

  /**
   * Retrieve the lines of that character.
   *
   * @return {LinesIndex}
   */
  lines() {
    return new LinesIndex(this.project).where({ character_id_eq: this.attributes.id });
  }

  /**
   * Retrieve the takes of that character.
   *
   * @return {TakesIndex}
   */
  takes() {
    return new TakesIndex(this.project).where({ character_id_eq: this.attributes.id });
  }
}

export default Character;

import Resource from './Resource';
import TakesIndex from './TakesIndex';

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
   * Retrieve the takes of that character.
   *
   * @return {TakesIndex}
   */
  takes() {
    return new TakesIndex(this.project).where({ character_id_eq: this.attributes.id });
  }
}

export default Character;

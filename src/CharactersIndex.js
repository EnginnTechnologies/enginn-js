import Character from './Character.js';
import ResourcesIndex from './ResourcesIndex.js';

/**
 * @class CharactersIndex
 * @see {@link ResourcesIndex}
 */
class CharactersIndex extends ResourcesIndex {
  /**
   * @see {@link ResourcesIndex#resource}
   */
  static resource = Character;
}

export default CharactersIndex;

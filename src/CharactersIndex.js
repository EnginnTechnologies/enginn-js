import Character from './Character';
import ResourcesIndex from './ResourcesIndex';

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

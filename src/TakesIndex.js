import Take from './Take';
import ResourcesIndex from './ResourcesIndex';

/**
 * @class TakesIndex
 * @see {@link ResourcesIndex}
 */
class TakesIndex extends ResourcesIndex {
  /**
   * @see {@link ResourcesIndex#resource}
   */
  static resource = Take;
}

export default TakesIndex;

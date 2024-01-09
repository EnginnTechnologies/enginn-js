import Take from './Take.js';
import ResourcesIndex from './ResourcesIndex.js';

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

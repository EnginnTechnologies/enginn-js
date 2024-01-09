import TakeBatch from './TakeBatch.js';
import ResourcesIndex from './ResourcesIndex.js';

/**
 * @class TakeBatchesIndex
 * @see {@link ResourcesIndex}
 */
class TakeBatchesIndex extends ResourcesIndex {
  /**
   * @see {@link ResourcesIndex#resource}
   */
  static resource = TakeBatch;
}

export default TakeBatchesIndex;

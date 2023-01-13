import TakeBatch from './TakeBatch';
import ResourcesIndex from './ResourcesIndex';

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

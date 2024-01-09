import Line from './Line.js';
import ResourcesIndex from './ResourcesIndex.js';

/**
 * @class LinesIndex
 * @see {@link ResourcesIndex}
 */
class LinesIndex extends ResourcesIndex {
  /**
   * @see {@link ResourcesIndex#resource}
   */
  static resource = Line;
}

export default LinesIndex;

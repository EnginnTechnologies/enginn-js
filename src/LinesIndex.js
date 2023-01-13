import Line from './Line';
import ResourcesIndex from './ResourcesIndex';

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

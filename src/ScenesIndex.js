import Scene from './Scene';
import ResourcesIndex from './ResourcesIndex';

/**
 * @class ScenesIndex
 * @see {@link ResourcesIndex}
 */
class ScenesIndex extends ResourcesIndex {
  /**
   * @see {@link ResourcesIndex#resource}
   */
  static resource = Scene;
}

export default ScenesIndex;

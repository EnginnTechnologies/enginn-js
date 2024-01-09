import Scene from './Scene.js';
import ResourcesIndex from './ResourcesIndex.js';

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

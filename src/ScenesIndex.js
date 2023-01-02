import Scene from './Scene';
import ResourceIndex from './ResourceIndex';

/**
 * @class ScenesIndex
 * @see {@link ResourceIndex}
 */
class ScenesIndex extends ResourceIndex {
  /**
   * @see {@link ResourceIndex#resource}
   */
  static resource = Scene;
}

export default ScenesIndex;

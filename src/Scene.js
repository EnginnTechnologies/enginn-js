import Resource from './Resource';
import LinesIndex from './LinesIndex';

/**
 * @class Scene
 * @see {@link Resource}
 */
class Scene extends Resource {
  /**
   * @see {@link Resource#pathName}
   */
  static pathName = 'scenes';

  /**
   * @see {@link Resource#resourceName}
   */
  static resourceName = 'scene';

  /**
   * Retrieve the lines of that scene.
   *
   * @return {LinesIndex}
   */
  lines() {
    return new LinesIndex(this.project).where({ scene_id_eq: this.attributes.id });
  }
}

export default Scene;

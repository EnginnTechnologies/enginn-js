import Resource from './Resource';
import TakesIndex from './TakesIndex';

/**
 * @class Line
 * @see {@link Resource}
 */
class Line extends Resource {
  /**
   * @see {@link Resource#pathName}
   */
  static pathName = 'lines';

  /**
   * @see {@link Resource#resourceName}
   */
  static resourceName = 'line';

  /**
   * Retrieve the takes of that line.
   *
   * @return {TakesIndex}
   */
  takes() {
    return new TakesIndex(this.project).where({ line_id_eq: this.attributes.id });
  }
}

export default Line;

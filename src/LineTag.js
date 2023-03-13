import Resource from './Resource';
import LinesIndex from './LinesIndex';

/**
 * @class LineTag
 * @see {@link Resource}
 */
class LineTag extends Resource {
  /**
   * @see {@link Resource#pathName}
   */
  static pathName = 'line_tags';

  /**
   * @see {@link Resource#resourceName}
   */
  static resourceName = 'line_tag';

  /**
   * Retrieve the lines tagged with this tag.
   *
   * @return {LinesIndex}
   */
  lines() {
    return new LinesIndex(this.project).where({ line_tag_id_eq: this.attributes.id });
  }
}

export default LineTag;

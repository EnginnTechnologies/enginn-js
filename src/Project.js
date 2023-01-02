import Resource from './Resource';
import ScenesIndex from './ScenesIndex';

/**
 * @class Project
 * @see {@link Resource}
 */
class Project extends Resource {
  /**
   * @see {@link Resource#pathName}
   */
  static pathName = 'projects';

  /**
   * @see {@link Resource#resourceName}
   */
  static resourceName = 'project';

  /**
   * @constructor
   * @param {Client} client The client to use with this project and its sub-resources
   */
  constructor(client, attributes = {}) {
    super(null, attributes);
    this.project = this;
    this.client = client;
  }

  /**
   * Retrieve the scenes present in this project.
   *
   * @return {ScenesIndex}
   */
  scenes() {
    return new ScenesIndex(this);
  }

  /**
   * @protected
   * @see {@link Resource#_route}
   */
  _route() {
    return `${this.constructor.pathName}/${this.attributes.id}`;
  }
}

export default Project;

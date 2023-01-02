import Project from './Project';
import ResourceIndex from './ResourceIndex';

/**
 * @class ProjectsIndex
 * @see {@link ResourceIndex}
 */
class ProjectsIndex extends ResourceIndex {
  /**
   * @see {@link ResourceIndex#resource}
   */
  static resource = Project;

  /**
   * @constructor
   * @param {Client} client The client to use with the indexed projects and resources
   */
  constructor(client) {
    super();
    this.project = this;
    this.client = client;
  }

  /**
   * @see {@link ResourceIndex#fetch}
   */
  async fetch() {
    const response = await this._request();
    this.pagination = response.pagination;
    this.collection = response.result.map(attributes => new (this.constructor.resource)(this.client, attributes));
  }

  /**
   * @protected
   * @see {@link ResourceIndex#_route}
   */
  _route() {
    return 'projects';
  }
}

export default ProjectsIndex;

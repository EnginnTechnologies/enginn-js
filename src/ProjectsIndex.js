import Project from './Project.js';
import ResourcesIndex from './ResourcesIndex.js';

/**
 * @class ProjectsIndex
 * @see {@link ResourcesIndex}
 */
class ProjectsIndex extends ResourcesIndex {
  /**
   * @see {@link ResourcesIndex#resource}
   */
  static resource = Project;

  /**
   * @constructor
   * @param {Client} client The client to use with the indexed projects and resources
   */
  constructor(client) {
    // small hack to trick inherited constructor
    const project = new Project();
    super(project);

    this.project = this;
    this.client = client;
  }

  /**
   * @see {@link ResourcesIndex#fetch}
   */
  async fetch() {
    const response = await this._request();
    this.pagination = response.pagination;
    this.collection = response.result.map(attributes => new (this.constructor.resource)(this.client, attributes));
  }

  /**
   * @protected
   * @see {@link ResourcesIndex#_route}
   */
  _route() {
    return 'projects';
  }
}

export default ProjectsIndex;

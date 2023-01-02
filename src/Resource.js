import Utils from './Utils';

/**
 * @class Resource
 *
 * A Resource can be a Character, a Take, or anything described in the
 * [Enginn API doc]{@link https://app.enginn.tech/api/docs}.
 *
 * A Resource depends on a Client that will be used for actual HTTP operations
 * and is relative to a parent Project (see {@link Resource} parameters). When a
 * Resource is fetched through {@link Resource#fetch} or {@link Resource#save}, any received attributes
 * from the API is synced with the object such as it is available as an
 * instance method.
 *
 * A Resource whose attributes include an ID will be considered as already
 * existing and as such, subsequent calls to {@link Resource#save} will issue a PATCH
 * request. Otherwise, a POST request will be issued instead, allowing the
 * creation of a new Resource.
 *
 * @property {string} pathName     The name used to build a path on the API
 * @property {string} resourceName The name used to build a request body on the API
 *
 * @example
 * const character = new Character(project, { id: "00000000-0000-0000-0000-000000000000" });
 * console.log(character.name); // => undefined
 * await character.fetch();
 * console.log(character.name); // => 'Rocky'
 *
 * @example
 * const scene = new Scene(project, { name: 'Grand Finale' });
 * scene.save(); // POST request (i.e. a new scene created)
 * console.log(scene.id); // => "00000000-0000-0000-0000-000000000001"
 * scene.name = 'The End';
 * scene.save(); // PATCH request (i.e. the scene is updated)
 */
class Resource {
  /**
   * @constructor
   * @param {Project} project       The parent project of this resource
   * @param {Object}  attributes    The resource attributes to initialize the resource with
   * @param {string}  attributes.id The resource ID (available for all resources)
   */
  constructor(project, attributes = {}) {
    this.project = project;
    this.attributes = {};
    this.#syncPropertiesWith(attributes || {});
  }

  /**
   * Fetch the resource.
   * Performs a GET request on the API.
   *
   * @returns {Promise} A promise that resolves or fails with an error message
   */
  async fetch() {
    const response = await this._request('GET');
    if(response.status >= 400) throw response.status;

    this.#syncPropertiesWith(response.result);
    return this;
  }

  /**
   * Saves the resource.
   * Performs a POST or a PATCH request on the API.
   *
   * @returns {Promise} A promise that resolves or fails with an error message
   */
  async save() {
    const response = await this._request(this.attributes.id ? 'PATCH' : 'POST');
    if(response.status >= 400) throw response.status;

    this.#syncPropertiesWith(response.result);
    return this;
  }

  /**
   * Deletes the resource.
   * Performs a DELETE request on the API.
   *
   * @returns {Promise} A promise that resolves or fails with an error message
   */
  async destroy() {
    const response = await this._request('DELETE');
    if(response.status >= 400) throw response.status;

    return this;
  }

  /**
   *
   * @returns {string} String representation of the record
   */
  toString() {
    return JSON.stringify(this);
  }

  /**
   *
   * @protected
   * @returns {string} The full path to that resource
   */
  _route() {
    return `${this.project._route()}/${this.constructor.pathName}/${this.attributes.id}`;
  }

  /**
   * Adds attributes but also property getters and setters
   * This method performs a merge so old attributes and methods are kept
   *
   * @private
   * @param {Object} hash Attributes to be added
   */
  #syncPropertiesWith(hash) {
    this.attributes = { ...this.attributes, ...hash };
    Object.keys(this.attributes).forEach(attribute => {
      const attributeName = Utils.camelize(attribute);
      if(Object.prototype.hasOwnProperty.call(this, attributeName)) return;

      Object.defineProperty(this, attributeName, {
        get: () => {
          return this.attributes[attribute];
        },
        set: (newValue) => {
          this.attributes[attribute] = newValue;
        }
      });
    });
  }

  /**
   * Performs a request on the related API client
   *
   * @protected
   * @param {string} method HTTP method to be used
   * @return {Promise} The fetch promise
   * @see {@link Client#get}
   * @see {@link Client#patch}
   * @see {@link Client#delete}
   */
  async _request(method) {
    const params = {};
    if(['POST', 'PATCH'].includes(method)) params[this.constructor.resourceName] = this.attributes;
    return this.project.client[method.toLowerCase()](this._route(), params);
  }
}

export default Resource;

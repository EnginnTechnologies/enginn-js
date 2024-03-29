import Resource from './Resource.js';

/**
 * @class ResourcesIndex
 *
 * A ResourcesIndex is a collection of fetchable {@link Resource}.
 *
 * It can be filtered and paginated through the chainable methods {@link ResourcesIndex#per},
 * {@link ResourcesIndex#page}, and {@link ResourcesIndex#where}.
 * It also provides methods to iterate on the collection.
 *
 * Actual API requests are only issued when {@link ResourcesIndex#first} or
 * {@link ResourcesIndex#forEach} methods are called. While {@link ResourcesIndex#forEach}-ing,
 * new API request will be issued when the end of a page is reached.
 * Note that when using {@link ResourcesIndex#page}, only the given page is reached for.
 * One can also force fetching manually using {@link ResourcesIndex#fetch}.
 *
 * @property {class} resource The type of resources being indexed (a {@link Resource} subclass)
 *
 * @example
 * const takes = project.takes.where(synthesis_text_cont: 'hello');
 * takes.forEach((take) => console.log(take.character_name));
 *
 */
class ResourcesIndex {
  /**
   * @constructor
   * @param {Project} project The parent project of the indexed resource
   */
  constructor(project) {
    if(!(project instanceof Resource)) throw new TypeError('project');

    this.project = project;
    this.filters = {};
    this.pagination = { current: 1 };
    this.collection = [];
  }

  /**
   * Calls a callback function on each resource of the index.
   * It fetches on the API new resources whenever required.
   *
   * @param {Object} callback The function to call on each resource
   * @return {ResourcesIndex} The index itself (useful for chaining)
   */
  async forEach(callback) {
    await this.fetch();
    this.collection.forEach(callback);
    if(this.pagination.locked) return this;

    while(this.pagination.current < this.pagination.last) {
      this.pagination.current += 1;
      await this.fetch();
      this.collection.forEach(callback);
    }

    this.pagination.current = 1;
    return this;
  }

  /**
   * Calls a callback function on each resource of the index to build an array of results.
   * It fetches on the API new resources whenever required.
   *
   * @param {Object} callback The function to call on each resource
   * @return {Array} The index itself (useful for chaining)
   */
  async map(callback) {
    const result = [];
    await this.forEach(resource => result.push(callback.call(this, resource)));
    return result;
  }

  /**
   * Returns the first resource of the index.
   * It fetches on the API only that single element.
   *
   * @return {Resource} The first resource (usually of a more-specific type, e.g. Take, Scene, ...)
   */
  async first() {
    const newIndex = this.per(1).page(1);
    await newIndex.fetch();
    return newIndex.collection[0];
  }

  /**
   * Clone the index to create a whole new object.
   * It resets the collection
   *
   * @private
   * @returns {ResourcesIndex} A clone index
   */
  clone() {
    return Object.assign(Object.create(this), {
      collection: [],
      filters: JSON.parse(JSON.stringify(this.filters)),
      pagination: { ...this.pagination }
    });
  }

  /**
   * Clone the index to target another page.
   *
   * @private
   * @param {number} page The page number
   * @returns {ResourcesIndex} A new index with updated pagination
   */
  page(page) {
    const newIndex = this.clone();
    newIndex.pagination = { ...this.pagination, current: page, locked: true };
    return newIndex;
  }

  /**
   * Clone the index to change page size.
   *
   * @private
   * @param {number} per The number of items per page
   * @returns {ResourcesIndex} A new index with updated pagination
   */
  per(per) {
    const newIndex = this.clone();
    newIndex.pagination = { ...this.pagination, per: per };
    return newIndex;
  }

  /**
   * Clone the index to change filters.
   * This merges filters, so chaining where(...).where(...) will combine filters
   *
   * @private
   * @param {Object} filters Filters as you would use them in the `q` object with the API.
   * @returns {ResourcesIndex} A new index with updated filters
   */
  where(filters) {
    const newIndex = this.clone();
    newIndex.filters = { ...this.filters, ...(filters || {}) };
    return newIndex;
  }

  /**
   * Fetch the current page from the API. Resulting items of the collection are
   * wrapped in the corresponding {@link Resource} subclass.
   *
   * @returns {Promise} A promise that resolves or fails with an error message
   */
  async fetch() {
    const response = await this._request();
    this.pagination = response.pagination;
    this.collection = response.result.map(attributes => new (this.constructor.resource)(this.project, attributes));
  }

  /**
   *
   * @returns {string} String representation of the index
   */
  toString() {
    return JSON.stringify(this);
  }

  /**
   *
   * @protected
   * @returns {string} The full path to that index
   */
  _route() {
    return `${this.project._route()}/${this.constructor.resource.pathName}`;
  }

  /**
   * Performs a request on the related API client
   *
   * @protected
   * @return {Promise} The fetch promise
   * @see {@link Client#get}
   */
  async _request() {
    const params = {
      per: this.pagination.per,
      page: this.pagination.current,
      q: this.filters
    };

    Object.entries(params.q).forEach(([key, value]) => {
      if(value === null || value === undefined) {
        delete params.q[key];
      }
    });
    if(Object.keys(params.q).length < 1) delete params.q;
    Object.entries(params).forEach(([key, value]) => {
      if(value === null || value === undefined) {
        delete params[key];
      }
    });
    return this.project.client.get(this._route(), params);
  }
}

export default ResourcesIndex;

import Errors from './Errors';
import ProjectsIndex from './ProjectsIndex';

/**
 * @class Client
 *
 * A Client is the object handling requests to the API.
 *
 */
class Client {
  /**
   * @property {string} baseUrl The root URL of the API
   */
  baseUrl = 'https://app.enginn.tech/api/v1';

  /**
   * Creates an instance of Client.
   *
   * @constructor
   * @param {Object} options          The client properties
   * @param {string} options.apiToken The API token to use
   */
  constructor(options = {}) {
    this.apiToken = options.apiToken;
  }

  url(path) {
    return `${this.baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
  }

  headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  async get(path, options = {}) {
    const request = new Request(this.url(path), {
      method: 'GET',
      headers: { ...this.headers(), ...options.headers }
    });
    return this.#send(request);
  }

  async patch(path, params, options = {}) {
    const request = new Request(this.url(path), {
      method: 'PATCH',
      headers: { ...this.headers(), ...options.headers },
      body: JSON.stringify(params)
    });
    return this.#send(request);
  }

  async delete(path, options = {}) {
    const request = new Request(this.url(path), {
      method: 'DELETE',
      headers: { ...this.headers(), ...options.headers }
    });
    return this.#send(request);
  }

  async #send(request) {
    return fetch(request).then(response => {
      if(!response.ok) throw Errors.fetchResponseError(response);

      return response.json();
    }).catch(error => {
      if(error instanceof Errors.EnginnError) throw error;

      throw new Errors.FetchError(`${error}`);
    });
  }

  /**
   * Retrieve the projects the account has access to.
   *
   * @returns {ProjectsIndex}
   */
  projects() {
    return new ProjectsIndex(this);
  }
}

export default Client;

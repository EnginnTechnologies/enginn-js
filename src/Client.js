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
   * @param {Object} options           The client properties
   * @param {string} options.api_token The API token to use
   */
  constructor(options = {}) {
    this.api_token = options.api_token;
  }

  url(path) {
    return `${this.baseUrl}/${path}`;
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
    return fetch(request).then(response => response.json());
  }

  async patch(path, params, options = {}) {
    const request = new Request(this.url(path), {
      method: 'PATCH',
      headers: { ...this.headers(), ...options.headers },
      body: JSON.stringify(params)
    });
    return fetch(request).then(response => response.json());
  }

  async delete(path, options = {}) {
    const request = new Request(this.url(path), {
      method: 'DELETE',
      headers: { ...this.headers(), ...options.headers }
    });
    return fetch(request).then(response => response.json());
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

import Client from '../src/Client';
import Errors from '../src/Errors';
import ProjectsIndex from '../src/ProjectsIndex';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Client', () => {
  describe('constructor', () => {
    it('allows no options', () => {
      const client = new Client();
      expect(client).toBeInstanceOf(Client);
    });

    it('allows to specify apiToken', () => {
      const client = new Client({ apiToken: 'foo' });
      expect(client.apiToken).toEqual('foo');
    });
  });

  describe('.url', () => {
    const client = new Client();

    it('defines a function', () => {
      expect(typeof client.url).toBe('function');
    });

    it('handles empty path', () => {
      expect(client.url('/')).toEqual('https://app.enginn.tech/api/v1/');
    });

    it('uses a default baseUrl', () => {
      expect(client.url('foo')).toEqual('https://app.enginn.tech/api/v1/foo');
    });

    it('handles leading slash', () => {
      expect(client.url('/foo')).toEqual('https://app.enginn.tech/api/v1/foo');
    });

    it('allows a custom baseUrl', () => {
      client.baseUrl = 'https://custom.bar';
      expect(client.url('foo')).toEqual('https://custom.bar/foo');
    });

    it('handles trailing slash', () => {
      client.baseUrl = 'https://custom.bar/';
      expect(client.url('foo')).toEqual('https://custom.bar/foo');
    });

    it('handles params', () => {
      client.baseUrl = 'https://custom.bar/';
      expect(client.url('/foo', { a: 42 })).toEqual('https://custom.bar/foo?a=42');
      expect(client.url('/foo', { b: [1, 2] })).toEqual('https://custom.bar/foo?b[]=1&b[]=2');
      expect(client.url('/foo', { c: { d: 5 } })).toEqual('https://custom.bar/foo?c[d]=5');
      expect(client.url('/foo', { c: { d: [5, 6], e: { f: 7 } } })).toEqual('https://custom.bar/foo?c[d][]=5&c[d][]=6&c[e][f]=7');
    });
  });

  describe('.#send', () => {
    const client = new Client();
    client.baseUrl = 'https://mock/';

    // we use the 'get' method to call '#send', since it is a private method

    it('does not authenticate if no API token is provided', async () => {
      fetch.mockResponseOnce(req => Promise.resolve(JSON.stringify(req.headers.get('Authorization'))));
      const response = await client.get('/');
      expect(response).toEqual(null);
    });

    it('authenticates if an API token is provided', async () => {
      client.apiToken = 'foo';
      fetch.mockResponseOnce(req => Promise.resolve(JSON.stringify(req.headers.get('Authorization'))));
      const response = await client.get('/');
      expect(response).toEqual('Bearer foo');
    });

    it('resolves with data on success', async () => {
      fetch.mockResponseOnce(JSON.stringify({ foo: 'bar' }));
      const response = await client.get('/');
      expect(response.foo).toEqual('bar');
    });

    it('rejects with error on auth failure', async () => {
      fetch.mockResponseOnce('', { status: 401 });
      expect(client.get('/')).rejects.toThrow(Errors.UnauthorizedError);
    });

    it('rejects with error on 404 error', async () => {
      fetch.mockResponseOnce('', { status: 404 });
      expect(client.get('/')).rejects.toThrow(Errors.ResourceNotFound);
    });

    it('rejects with error on response interpretation error', async () => {
      fetch.mockResponseOnce('{misformedjson');
      expect(client.get('/')).rejects.toThrow(Errors.FetchError);
    });
  });

  describe('.get', () => {
    const client = new Client();
    client.baseUrl = 'https://mock/';

    it('allows to override headers', async () => {
      fetch.mockResponseOnce(req => Promise.resolve(JSON.stringify(req.headers.get('Bar'))));
      const response = await client.get('/', {}, { headers: { Bar: 'foo' } });
      expect(response).toEqual('foo');
    });
  });

  describe('.post', () => {
    const client = new Client();
    client.baseUrl = 'https://mock/';

    it('sends a body', async () => {
      fetch.mockResponseOnce(req => req.json().then(body => JSON.stringify(body)));
      const response = await client.post('/', { data: 42 });
      expect(response.data).toEqual(42);
    });

    it('allows to override headers', async () => {
      fetch.mockResponseOnce(req => Promise.resolve(JSON.stringify(req.headers.get('Bar'))));
      const response = await client.post('/', {}, { headers: { Bar: 'foo' } });
      expect(response).toEqual('foo');
    });
  });

  describe('.patch', () => {
    const client = new Client();
    client.baseUrl = 'https://mock/';

    it('sends a body', async () => {
      fetch.mockResponseOnce(req => req.json().then(body => JSON.stringify(body)));
      const response = await client.patch('/', { data: 42 });
      expect(response.data).toEqual(42);
    });

    it('allows to override headers', async () => {
      fetch.mockResponseOnce(req => Promise.resolve(JSON.stringify(req.headers.get('Bar'))));
      const response = await client.patch('/', {}, { headers: { Bar: 'foo' } });
      expect(response).toEqual('foo');
    });
  });

  describe('.delete', () => {
    const client = new Client();
    client.baseUrl = 'https://mock/';

    it('allows to override headers', async () => {
      fetch.mockResponseOnce(req => Promise.resolve(JSON.stringify(req.headers.get('Bar'))));
      const response = await client.delete('/', { headers: { Bar: 'foo' } });
      expect(response).toEqual('foo');
    });
  });

  describe('.projects', () => {
    const client = new Client();
    const projects = client.projects();

    it('returns a ProjectsIndex', () => {
      expect(projects).toBeInstanceOf(ProjectsIndex);
    });

    it('uses the same Client instance', () => {
      expect(Object.is(projects.client, client)).toBe(true);
    });
  });
});

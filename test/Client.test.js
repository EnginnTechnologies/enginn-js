import Client from '../src/Client';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Client', () => {
  describe('constructor', () => {
    test('allows no options', () => {
      const client = new Client();
      return expect(typeof client).toEqual('object');
    });

    test('allows to specify apiToken', () => {
      const client = new Client({ apiToken: 'foo' });
      return expect(client.apiToken).toEqual('foo');
    });
  });

  describe('.url', () => {
    const client = new Client();

    test('defines a function', () => {
      expect(typeof client.url).toBe('function');
    });

    test('handles empty path', () => {
      return expect(client.url('/')).toEqual('https://app.enginn.tech/api/v1/');
    });

    test('uses a default baseUrl', () => {
      return expect(client.url('foo')).toEqual('https://app.enginn.tech/api/v1/foo');
    });

    test('handles leading slash', () => {
      return expect(client.url('/foo')).toEqual('https://app.enginn.tech/api/v1/foo');
    });

    test('allows a custom baseUrl', () => {
      client.baseUrl = 'https://custom.bar';
      return expect(client.url('foo')).toEqual('https://custom.bar/foo');
    });

    test('handles trailing slash', () => {
      client.baseUrl = 'https://custom.bar/';
      return expect(client.url('foo')).toEqual('https://custom.bar/foo');
    });
  });

  describe('.get', () => {
    const client = new Client();
    client.baseUrl = 'https://mock/';

    it('resolves with data on success', async () => {
      fetch.mockResponseOnce(JSON.stringify({ foo: 'bar' }));
      const response = await client.get('/');
      expect(response.foo).toEqual('bar');
    });

    it('rejects with error on failure', async () => {
      const error = new Error('API is down');
      fetch.mockReject(error);
      expect(client.get('/')).rejects.toEqual(error);
    });
  });
});

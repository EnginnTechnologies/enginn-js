import Client from '../src/Client';
import Errors from '../src/Errors';
import Project from '../src/Project';
import Resource from '../src/Resource';

beforeEach(() => {
  fetch.resetMocks();
});

class Foo extends Resource {
  static pathName = 'allthefoos';
  static resourceName = 'foo';
}

describe('Resource', () => {
  describe('constructor', () => {
    it('allows no arguments', () => {
      const resource = new Resource();
      expect(resource).toBeInstanceOf(Resource);
    });

    it('accepts a project', () => {
      const project = new Project();
      const resource = new Resource(project);
      expect(resource).toBeInstanceOf(Resource);
      expect(Object.is(resource.project, project)).toBe(true);
    });

    it('sets default attributes', () => {
      const resource = new Resource();
      expect(resource.attributes).toEqual({});
    });

    it('accepts attributes', () => {
      const resource = new Resource(null, { a: 42 });
      expect(resource.attributes).toEqual({ a: 42 });
    });
  });

  describe('._route', () => {
    it('returns the proper path', () => {
      const project = new Project(null, { id: 42 }),
            foo = new Foo(project, { id: 13 });
      expect(foo._route()).toEqual('projects/42/allthefoos/13');
    });
  });

  describe('.#syncPropertiesWith', () => {
    it('defines getters and setters', () => {
      // here we use the constructor which calls '#syncPropertiesWith', since it is a private method
      const foo = new Foo(null, { name: 'bar' });

      expect(foo).toHaveProperty('name');
      foo.name = 'other';
      expect(foo.attributes).toEqual({ name: 'other' });
    });

    it('merges attributes', async () => {
      // here we use the 'fetch' method to call '#syncPropertiesWith', since it is a private method
      const client = new Client(),
            project = new Project(client, { id: 42 }),
            foo = new Foo(project, { name: 'bar', old: 1 });
      fetch.mockResponseOnce(JSON.stringify({ result: { id: 13, old: 2 } }));
      await foo.fetch();

      expect(foo.attributes).toEqual({ id: 13, name: 'bar', old: 2 });
    });
  });

  describe('._request', () => {
    it('sends a request', async () => {
      const client = new Client(),
            project = new Project(client, { id: 42 }),
            foo = new Foo(project, { id: 13 }),
            getSpy = jest.spyOn(client, 'get');
      fetch.mockResponseOnce(JSON.stringify({ result: { id: 13, name: 'bar' } }));
      const response = await foo._request('GET');

      expect(getSpy).toHaveBeenCalledWith('projects/42/allthefoos/13', {});
      expect(response).toEqual({ result: { id: 13, name: 'bar' } });
    });

    it('rejects with error on failure', async () => {
      const client = new Client(),
            project = new Project(client, { id: 42 }),
            foo = new Foo(project, { id: 13 }),
            getSpy = jest.spyOn(client, 'get');
      fetch.mockResponseOnce('', { status: 404 });

      expect(foo._request('GET')).rejects.toThrow(Errors.ResourceNotFound);
    });
  });

  describe('.fetch', () => {
    it('fetches attributes', async () => {
      const client = new Client(),
            project = new Project(client, { id: 42 }),
            foo = new Foo(project, { id: 13 }),
            getSpy = jest.spyOn(client, 'get');
      fetch.mockResponseOnce(JSON.stringify({ result: { id: 13, name: 'bar' } }));
      const result = await foo.fetch();

      expect(getSpy).toHaveBeenCalledWith('projects/42/allthefoos/13', {});
      expect(foo.attributes).toEqual({ id: 13, name: 'bar' });
      expect(Object.is(result, foo)).toBe(true);
    });
  });

  describe('.save', () => {
    it('creates a new resoure', async () => {
      const client = new Client(),
            project = new Project(client, { id: 42 }),
            foo = new Foo(project, { name: 'bar' }),
            postSpy = jest.spyOn(client, 'post');
      fetch.mockResponseOnce(JSON.stringify({ result: { id: 13, name: 'bar' } }));
      const result = await foo.save();

      expect(postSpy).toHaveBeenCalledWith('projects/42/allthefoos', { foo: { name: 'bar' }});
      expect(foo.attributes).toEqual({ id: 13, name: 'bar' });
      expect(Object.is(result, foo)).toBe(true);
    });

    it('updates an existing resoure', async () => {
      const client = new Client(),
            project = new Project(client, { id: 42 }),
            foo = new Foo(project, { id: 13, name: 'bar' }),
            patchSpy = jest.spyOn(client, 'patch');
      fetch.mockResponseOnce(JSON.stringify({ result: { id: 13, name: 'bar' } }));
      const result = await foo.save();

      expect(patchSpy).toHaveBeenCalledWith('projects/42/allthefoos/13', { foo: { id: 13, name: 'bar' }});
      expect(Object.is(result, foo)).toBe(true);
    });
  });

  describe('.destroy', () => {
    it('deletes the resource', async () => {
      const client = new Client(),
            project = new Project(client, { id: 42 }),
            foo = new Foo(project, { id: 13 }),
            deleteSpy = jest.spyOn(client, 'delete');
      fetch.mockResponseOnce('""');
      const result = await foo.destroy();

      expect(deleteSpy).toHaveBeenCalledWith('projects/42/allthefoos/13', {});
      expect(Object.is(result, foo)).toBe(true);
    });
  });
});

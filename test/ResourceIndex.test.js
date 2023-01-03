import Client from '../src/Client';
import Resource from '../src/Resource';
import ResourceIndex from '../src/ResourceIndex';
import Project from '../src/Project';

beforeEach(() => {
  fetch.resetMocks();
});

class Foo extends Resource {
  static pathName = 'allthefoos';
}

class FoosIndex extends ResourceIndex {
  static resource = Foo;
}

describe('ResourceIndex', () => {
  describe('constructor', () => {
    it('enforces project to be given', () => {
      expect(() => new ResourceIndex()).toThrow(TypeError);
    });

    it('enforces project to be of the proper type', () => {
      expect(() => new ResourceIndex({ a: 42 })).toThrow(TypeError);
    });

    it('accepts a proper project', () => {
      const project = new Project();
      const resourceIndex = new ResourceIndex(project);
      expect(resourceIndex).toBeInstanceOf(ResourceIndex);
      expect(Object.is(resourceIndex.project, project)).toBe(true);
    });

    it('sets default pagination', () => {
      const project = new Project();
      const resourceIndex = new ResourceIndex(project);
      expect(resourceIndex.pagination.current).toEqual(1);
      expect(resourceIndex.pagination.per).toBeUndefined();
    });
  });

  describe('.clone', () => {
    it('creates a clone', () => {
      const project = new Project();
      const resourceIndex = new ResourceIndex(project);
      resourceIndex.filters = { a: 7 };
      resourceIndex.pagination.current = 3;
      resourceIndex.pagination.per = 13;
      resourceIndex.collection = [1, 2, 3];
      const clone = resourceIndex.clone();
      resourceIndex.filters.a = 0;
      resourceIndex.pagination.current = 4;
      resourceIndex.pagination.per = 10;

      expect(clone).toBeInstanceOf(ResourceIndex);
      expect(Object.is(clone, resourceIndex)).toBe(false);
      expect(Object.is(clone.project, resourceIndex.project)).toBe(true);
      expect(clone.filters).toEqual({ a: 7 });
      expect(clone.pagination).toEqual({ current: 3, per: 13 });
      expect(clone.collection).toHaveLength(0);
    });
  });

  describe('.page', () => {
    it('creates a clone targeting another page', () => {
      const project = new Project();
      const resourceIndex = new ResourceIndex(project);
      expect(resourceIndex.pagination.current).toEqual(1);
      const clone = resourceIndex.page(3);
      expect(clone.pagination.current).toEqual(3);
    });
  });

  describe('.per', () => {
    it('creates a clone targeting a different page size', () => {
      const project = new Project();
      const resourceIndex = new ResourceIndex(project);
      expect(resourceIndex.pagination.per).toBeUndefined();
      const clone = resourceIndex.per(7);
      expect(clone.pagination.per).toEqual(7);
    });
  });

  describe('.where', () => {
    it('creates a clone with updated filters', () => {
      const project = new Project();
      const resourceIndex = new ResourceIndex(project);
      resourceIndex.filters = { a: 7 };
      const clone1 = resourceIndex.where({ b: 3 });
      expect(clone1.filters).toEqual({ a: 7, b: 3 });
      const clone2 = clone1.where({ a: 5, c: 9 });
      expect(clone2.filters).toEqual({ a: 5, b: 3, c: 9 });
    });
  });

  describe('._route', () => {
    it('returns the proper path', () => {
      const project = new Project(null, { id: 42 });
      const foosIndex = new FoosIndex(project);
      expect(foosIndex._route()).toEqual('projects/42/allthefoos');
    });
  });

  describe('._request', () => {
    it('sends the proper params', async () => {
      const client = new Client();
      const project = new Project(client, { id: 42 });
      const foosIndex = new FoosIndex(project);
      foosIndex.filters = { a: undefined, b: null, c: 3, d: [1, 2] };
      foosIndex.pagination.current = 3;
      foosIndex.pagination.per = 13;
      const getSpy = jest.spyOn(client, 'get');

      fetch.mockResponseOnce(JSON.stringify({ foo: 'bar' }));
      await foosIndex._request();
      expect(getSpy).toHaveBeenCalledWith('projects/42/allthefoos', {
        page: 3,
        per: 13,
        q: {
          c: 3,
          d: [1, 2]
        }
      });
    });
  });

  describe('.fetch', () => {
    it('updates collection and pagination', async () => {
      const client = new Client();
      const project = new Project(client, { id: 42 });
      const foosIndex = new FoosIndex(project);

      fetch.mockResponseOnce(JSON.stringify({
        result: [{ id: 13 }, { id: 15 }],
        pagination: { current: 1, per: 2, last: 5, count: 9 }
      }));
      await foosIndex.fetch();

      expect(foosIndex.pagination).toEqual({ current: 1, per: 2, last: 5, count: 9 });
      expect(foosIndex.collection).toHaveLength(2);
      expect(foosIndex.collection[0]).toBeInstanceOf(Foo);
      expect(foosIndex.collection[0].id).toEqual(13);
    });
  });

  describe('.first', () => {
    it('fetches the first element', async () => {
      const client = new Client();
      const project = new Project(client, { id: 42 });
      const foosIndex = new FoosIndex(project);
      foosIndex.pagination.current = 3;
      foosIndex.pagination.per = 13;
      const getSpy = jest.spyOn(client, 'get');

      fetch.mockResponseOnce(JSON.stringify({
        result: [{ id: 7 }],
        pagination: { current: 1, per: 1, last: 9, count: 9 }
      }));
      const foo = await foosIndex.first();

      // make sure the request has been sent with the proper params
      expect(getSpy).toHaveBeenCalledWith('projects/42/allthefoos', { page: 1, per: 1 });

      // make sure the initial index has not been modified
      expect(foosIndex.pagination).toEqual({ current: 3, per: 13 });
      expect(foosIndex.collection).toHaveLength(0);

      // make sure the result is the proper resource
      expect(foo).toBeInstanceOf(Foo);
      expect(foo.id).toEqual(7);
    });
  });

  describe('.forEach', () => {
    it('fetches a single current page', async () => {
      const client = new Client();
      const project = new Project(client, { id: 42 });
      const foosIndex = new FoosIndex(project);
      foosIndex.pagination.current = 3;
      foosIndex.pagination.per = 5;
      const getSpy = jest.spyOn(client, 'get');

      fetch.mockResponse(JSON.stringify({
        result: [{ id: 13 }, { id: 15 }],
        pagination: { current: 3, per: 5, last: 3, count: 12 }
      }));
      const foos = [];
      await foosIndex.forEach(f => foos.push(f));

      // make sure the request has been sent with the proper params
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith('projects/42/allthefoos', { page: 3, per: 5 });

      // make sure the pagination has been reset but page size has been kept
      expect(foosIndex.pagination).toEqual({ current: 1, per: 5, last: 3, count: 12 });

      // make sure the resources were returned and iterator was good
      expect(foos).toHaveLength(2);
      expect(Object.is(foosIndex.collection[0], foos[0])).toBe(true);
      expect(Object.is(foosIndex.collection[1], foos[1])).toBe(true);
    });

    it('fetches multiple pages', async () => {
      const client = new Client();
      const project = new Project(client, { id: 42 });
      const foosIndex = new FoosIndex(project);
      const getSpy = jest.spyOn(client, 'get');

      fetch.mockResponse(req => {
        const url = new URL(req.url),
              page = parseInt(url.searchParams.get('page'));
        let response;
        switch(page) {
          case 1:
            response = {
              result: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
              pagination: { current: 1, per: 4, last: 2, count: 7 }
            };
            break;
          case 2:
            response = {
              result: [{ id: 5 }, { id: 6 }, { id: 7 }],
              pagination: { current: 2, per: 4, last: 2, count: 7 }
            };
            break;
        }
        return Promise.resolve(JSON.stringify(response));
      });
      const foos = [];
      await foosIndex.forEach(f => foos.push(f));

      // make sure the request has been sent with the proper params
      expect(getSpy).toHaveBeenCalledTimes(2);
      expect(getSpy).toHaveBeenNthCalledWith(1, 'projects/42/allthefoos', { page: 1 });
      expect(getSpy).toHaveBeenNthCalledWith(2, 'projects/42/allthefoos', { page: 2, per: 4 });

      // make sure the resources were returned
      expect(foos).toHaveLength(7);
    });
  });

  describe('.map', () => {
    it('fetches multiple pages', async () => {
      const client = new Client();
      const project = new Project(client, { id: 42 });
      const foosIndex = new FoosIndex(project);

      fetch.mockResponse(req => {
        const url = new URL(req.url),
              page = parseInt(url.searchParams.get('page'));
        let response;
        switch(page) {
          case 1:
            response = {
              result: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
              pagination: { current: 1, per: 4, last: 2, count: 7 }
            };
            break;
          case 2:
            response = {
              result: [{ id: 5 }, { id: 6 }, { id: 7 }],
              pagination: { current: 2, per: 4, last: 2, count: 7 }
            };
            break;
        }
        return Promise.resolve(JSON.stringify(response));
      });
      const ids = await foosIndex.map(f => f.id);

      expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
  });
});

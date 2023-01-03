import ResourceIndex from '../src/ResourceIndex';
import Project from '../src/Project';

beforeEach(() => {
  fetch.resetMocks();
});

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
});

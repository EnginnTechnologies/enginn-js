import TakeBatch from '../src/TakeBatch';
import Project from '../src/Project';
import TakesIndex from '../src/TakesIndex';

beforeEach(() => {
  fetch.resetMocks();
});

describe('TakeBatch', () => {
  describe('.takes', () => {
    const project = new Project();
    const takeBatch = new TakeBatch(project, { id: 29 });
    const takes = takeBatch.takes();

    it('returns a TakesIndex', () => {
      expect(takes).toBeInstanceOf(TakesIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(takes.project, project)).toBe(true);
    });

    it('applies the proper filter', () => {
      expect(takes.filters).toEqual({ take_batch_id_eq: 29 });
    });
  });
});

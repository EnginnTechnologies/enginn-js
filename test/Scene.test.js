import Scene from '../src/Scene';
import Project from '../src/Project';
import LinesIndex from '../src/LinesIndex';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Scene', () => {
  describe('.lines', () => {
    const project = new Project();
    const scene = new Scene(project, { id: 23 });
    const lines = scene.lines();

    it('returns a LinesIndex', () => {
      expect(lines).toBeInstanceOf(LinesIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(lines.project, project)).toBe(true);
    });

    it('applies the proper filter', () => {
      expect(lines.filters).toEqual({ scene_id_eq: 23 });
    });
  });
});

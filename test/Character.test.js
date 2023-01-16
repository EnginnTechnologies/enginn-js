import Character from '../src/Character';
import LinesIndex from '../src/LinesIndex';
import Project from '../src/Project';
import TakesIndex from '../src/TakesIndex';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Character', () => {
  describe('.lines', () => {
    const project = new Project();
    const character = new Character(project, { id: 13 });
    const lines = character.lines();

    it('returns a LinesIndex', () => {
      expect(lines).toBeInstanceOf(LinesIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(lines.project, project)).toBe(true);
    });

    it('applies the proper filter', () => {
      expect(lines.filters).toEqual({ character_id_eq: 13 });
    });
  });

  describe('.takes', () => {
    const project = new Project();
    const character = new Character(project, { id: 13 });
    const takes = character.takes();

    it('returns a TakesIndex', () => {
      expect(takes).toBeInstanceOf(TakesIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(takes.project, project)).toBe(true);
    });

    it('applies the proper filter', () => {
      expect(takes.filters).toEqual({ character_id_eq: 13 });
    });
  });
});

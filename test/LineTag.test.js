import LineTag from '../src/LineTag';
import Project from '../src/Project';
import LinesIndex from '../src/LinesIndex';

beforeEach(() => {
  fetch.resetMocks();
});

describe('LineTag', () => {
  describe('.lines', () => {
    const project = new Project();
    const lineTag = new LineTag(project, { id: 7 });
    const lines = lineTag.lines();

    it('returns a LinesIndex', () => {
      expect(lines).toBeInstanceOf(LinesIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(lines.project, project)).toBe(true);
    });

    it('applies the proper filter', () => {
      expect(lines.filters).toEqual({ line_tag_id_eq: 7 });
    });
  });
});

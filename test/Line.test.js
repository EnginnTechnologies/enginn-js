import Line from '../src/Line';
import Project from '../src/Project';
import TakesIndex from '../src/TakesIndex';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Line', () => {
  describe('.takes', () => {
    const project = new Project();
    const line = new Line(project, { id: 17 });
    const takes = line.takes();

    it('returns a TakesIndex', () => {
      expect(takes).toBeInstanceOf(TakesIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(takes.project, project)).toBe(true);
    });

    it('applies the proper filter', () => {
      expect(takes.filters).toEqual({ line_id_eq: 17 });
    });
  });

  describe('.downloadUrl', () => {
    const project = new Project();
    const line = new Line(project, { id: 17, take_download_url: 'ftp://foo.bar/ok' });

    it('computes a proper URL', () => {
      expect(line.downloadUrl('xyz', 42, 1234)).toEqual('ftp://foo.bar/ok?format=xyz&resolution=42&sampling_rate=1234');
    });
  })
});

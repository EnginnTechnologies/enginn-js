import Project from '../src/Project';
import CharactersIndex from '../src/CharactersIndex';
import DictionaryEntriesIndex from '../src/DictionaryEntriesIndex';
import LinesIndex from '../src/LinesIndex';
import LineTagsIndex from '../src/LineTagsIndex';
import ScenesIndex from '../src/ScenesIndex';
import SynthesisExportsIndex from '../src/SynthesisExportsIndex';
import TakeBatchesIndex from '../src/TakeBatchesIndex';
import TakesIndex from '../src/TakesIndex';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Project', () => {
  describe('.characters', () => {
    const project = new Project();
    const characters = project.characters();

    it('returns a CharactersIndex', () => {
      expect(characters).toBeInstanceOf(CharactersIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(characters.project, project)).toBe(true);
    });
  });

  describe('.dictionaryEntries', () => {
    const project = new Project();
    const dictionaryEntries = project.dictionaryEntries();

    it('returns a DictionaryEntriesIndex', () => {
      expect(dictionaryEntries).toBeInstanceOf(DictionaryEntriesIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(dictionaryEntries.project, project)).toBe(true);
    });
  });

  describe('.lines', () => {
    const project = new Project();
    const lines = project.lines();

    it('returns a LinesIndex', () => {
      expect(lines).toBeInstanceOf(LinesIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(lines.project, project)).toBe(true);
    });
  });

  describe('.lineTags', () => {
    const project = new Project();
    const lineTags = project.lineTags();

    it('returns a LineTagsIndex', () => {
      expect(lineTags).toBeInstanceOf(LineTagsIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(lineTags.project, project)).toBe(true);
    });
  });

  describe('.scenes', () => {
    const project = new Project();
    const scenes = project.scenes();

    it('returns a ScenesIndex', () => {
      expect(scenes).toBeInstanceOf(ScenesIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(scenes.project, project)).toBe(true);
    });
  });

  describe('.synthesisExports', () => {
    const project = new Project();
    const synthesisExports = project.synthesisExports();

    it('returns a SynthesisExportsIndex', () => {
      expect(synthesisExports).toBeInstanceOf(SynthesisExportsIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(synthesisExports.project, project)).toBe(true);
    });
  });

  describe('.takeBatches', () => {
    const project = new Project();
    const takeBatches = project.takeBatches();

    it('returns a TakeBatchesIndex', () => {
      expect(takeBatches).toBeInstanceOf(TakeBatchesIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(takeBatches.project, project)).toBe(true);
    });
  });

  describe('.takes', () => {
    const project = new Project();
    const takes = project.takes();

    it('returns a TakesIndex', () => {
      expect(takes).toBeInstanceOf(TakesIndex);
    });

    it('uses the same Project instance', () => {
      expect(Object.is(takes.project, project)).toBe(true);
    });
  });
});

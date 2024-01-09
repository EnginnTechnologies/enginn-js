import Resource from './Resource.js';
import CharactersIndex from './CharactersIndex.js';
import DictionaryEntriesIndex from './DictionaryEntriesIndex.js';
import LinesIndex from './LinesIndex.js';
import LineTagsIndex from './LineTagsIndex.js';
import ScenesIndex from './ScenesIndex.js';
import SynthesisExportsIndex from './SynthesisExportsIndex.js';
import TakeBatchesIndex from './TakeBatchesIndex.js';
import TakesIndex from './TakesIndex.js';

/**
 * @class Project
 * @see {@link Resource}
 */
class Project extends Resource {
  /**
   * @see {@link Resource#pathName}
   */
  static pathName = 'projects';

  /**
   * @see {@link Resource#resourceName}
   */
  static resourceName = 'project';

  /**
   * @constructor
   * @param {Client} client The client to use with this project and its sub-resources
   */
  constructor(client, attributes = {}) {
    super(null, attributes);
    this.project = this;
    this.client = client;
  }

  /**
   * Retrieve the dictionary entries present in this project.
   *
   * @return {CharactersIndex}
   */
  characters() {
    return new CharactersIndex(this);
  }

  /**
   * Retrieve the characters present in this project.
   *
   * @see {@link Project#dictionaryEntries}
   */
  dictionary() {
    return this.dictionaryEntries();
  }

  /**
   * Retrieve the characters present in this project.
   *
   * @return {DictionaryEntriesIndex}
   */
  dictionaryEntries() {
    return new DictionaryEntriesIndex(this);
  }

  /**
   * Retrieve the lines present in this project.
   *
   * @return {LinesIndex}
   */
  lines() {
    return new LinesIndex(this);
  }

  /**
   * Retrieve the line tags present in this project.
   *
   * @return {LineTagsIndex}
   */
  lineTags() {
    return new LineTagsIndex(this);
  }

  /**
   * Retrieve the scenes present in this project.
   *
   * @return {ScenesIndex}
   */
  scenes() {
    return new ScenesIndex(this);
  }

  /**
   * Retrieve the synthesis exports present in this project.
   *
   * @return {SynthesisExportsIndex}
   */
  synthesisExports() {
    return new SynthesisExportsIndex(this);
  }

  /**
   * Retrieve the take batches present in this project.
   *
   * @return {TakeBatchesIndex}
   */
  takeBatches() {
    return new TakeBatchesIndex(this);
  }

  /**
   * Retrieve the takes present in this project.
   *
   * @return {TakesIndex}
   */
  takes() {
    return new TakesIndex(this);
  }

  /**
   * @protected
   * @see {@link Resource#_route}
   */
  _route() {
    return `${this.constructor.pathName}/${this.attributes.id || ''}`;
  }
}

export default Project;

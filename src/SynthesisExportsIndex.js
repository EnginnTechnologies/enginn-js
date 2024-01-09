import SynthesisExport from './SynthesisExport.js';
import ResourcesIndex from './ResourcesIndex.js';

/**
 * @class SynthesisExportsIndex
 * @see {@link ResourcesIndex}
 */
class SynthesisExportsIndex extends ResourcesIndex {
  /**
   * @see {@link ResourcesIndex#resource}
   */
  static resource = SynthesisExport;
}

export default SynthesisExportsIndex;

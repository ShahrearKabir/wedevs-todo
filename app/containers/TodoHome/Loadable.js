/**
 *
 * Asynchronously loads the component for TodoHome
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

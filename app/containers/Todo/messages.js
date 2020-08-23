/*
 * Todo Messages
 *
 * This contains all the text for the Todo container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Todo';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Todo container!',
  },
});

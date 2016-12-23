import * as ActionTypes from './action-types';

export default function syncAction(data) {
  return {
    type: ActionTypes.SYNC_ACTION,
    data,
  };
}

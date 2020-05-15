import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEvento, defaultValue } from 'app/shared/model/evento.model';

export const ACTION_TYPES = {
  FETCH_EVENTO_LIST: 'evento/FETCH_EVENTO_LIST',
  FETCH_EVENTO: 'evento/FETCH_EVENTO',
  CREATE_EVENTO: 'evento/CREATE_EVENTO',
  UPDATE_EVENTO: 'evento/UPDATE_EVENTO',
  DELETE_EVENTO: 'evento/DELETE_EVENTO',
  RESET: 'evento/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEvento>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EventoState = Readonly<typeof initialState>;

// Reducer

export default (state: EventoState = initialState, action): EventoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EVENTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EVENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EVENTO):
    case REQUEST(ACTION_TYPES.UPDATE_EVENTO):
    case REQUEST(ACTION_TYPES.DELETE_EVENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EVENTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EVENTO):
    case FAILURE(ACTION_TYPES.CREATE_EVENTO):
    case FAILURE(ACTION_TYPES.UPDATE_EVENTO):
    case FAILURE(ACTION_TYPES.DELETE_EVENTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EVENTO):
    case SUCCESS(ACTION_TYPES.UPDATE_EVENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EVENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/eventos';

// Actions

export const getEntities: ICrudGetAllAction<IEvento> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EVENTO_LIST,
  payload: axios.get<IEvento>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEvento> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTO,
    payload: axios.get<IEvento>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEvento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EVENTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEvento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EVENTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEvento> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EVENTO,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

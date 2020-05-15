import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INodo, defaultValue } from 'app/shared/model/nodo.model';

export const ACTION_TYPES = {
  FETCH_NODO_LIST: 'nodo/FETCH_NODO_LIST',
  FETCH_NODO: 'nodo/FETCH_NODO',
  CREATE_NODO: 'nodo/CREATE_NODO',
  UPDATE_NODO: 'nodo/UPDATE_NODO',
  DELETE_NODO: 'nodo/DELETE_NODO',
  RESET: 'nodo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INodo>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NodoState = Readonly<typeof initialState>;

// Reducer

export default (state: NodoState = initialState, action): NodoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NODO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NODO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NODO):
    case REQUEST(ACTION_TYPES.UPDATE_NODO):
    case REQUEST(ACTION_TYPES.DELETE_NODO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NODO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NODO):
    case FAILURE(ACTION_TYPES.CREATE_NODO):
    case FAILURE(ACTION_TYPES.UPDATE_NODO):
    case FAILURE(ACTION_TYPES.DELETE_NODO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NODO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NODO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NODO):
    case SUCCESS(ACTION_TYPES.UPDATE_NODO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NODO):
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

const apiUrl = 'api/nodos';

// Actions

export const getEntities: ICrudGetAllAction<INodo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NODO_LIST,
  payload: axios.get<INodo>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INodo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NODO,
    payload: axios.get<INodo>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INodo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NODO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INodo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NODO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<INodo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NODO,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

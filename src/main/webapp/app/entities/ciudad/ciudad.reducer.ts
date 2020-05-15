import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICiudad, defaultValue } from 'app/shared/model/ciudad.model';

export const ACTION_TYPES = {
  FETCH_CIUDAD_LIST: 'ciudad/FETCH_CIUDAD_LIST',
  FETCH_CIUDAD: 'ciudad/FETCH_CIUDAD',
  CREATE_CIUDAD: 'ciudad/CREATE_CIUDAD',
  UPDATE_CIUDAD: 'ciudad/UPDATE_CIUDAD',
  DELETE_CIUDAD: 'ciudad/DELETE_CIUDAD',
  RESET: 'ciudad/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICiudad>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CiudadState = Readonly<typeof initialState>;

// Reducer

export default (state: CiudadState = initialState, action): CiudadState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CIUDAD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CIUDAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CIUDAD):
    case REQUEST(ACTION_TYPES.UPDATE_CIUDAD):
    case REQUEST(ACTION_TYPES.DELETE_CIUDAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CIUDAD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CIUDAD):
    case FAILURE(ACTION_TYPES.CREATE_CIUDAD):
    case FAILURE(ACTION_TYPES.UPDATE_CIUDAD):
    case FAILURE(ACTION_TYPES.DELETE_CIUDAD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CIUDAD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CIUDAD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CIUDAD):
    case SUCCESS(ACTION_TYPES.UPDATE_CIUDAD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CIUDAD):
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

const apiUrl = 'api/ciudads';

// Actions

export const getEntities: ICrudGetAllAction<ICiudad> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CIUDAD_LIST,
  payload: axios.get<ICiudad>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICiudad> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CIUDAD,
    payload: axios.get<ICiudad>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICiudad> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CIUDAD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICiudad> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CIUDAD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICiudad> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CIUDAD,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

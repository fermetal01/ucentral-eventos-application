import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISemillero, defaultValue } from 'app/shared/model/semillero.model';

export const ACTION_TYPES = {
  FETCH_SEMILLERO_LIST: 'semillero/FETCH_SEMILLERO_LIST',
  FETCH_SEMILLERO: 'semillero/FETCH_SEMILLERO',
  CREATE_SEMILLERO: 'semillero/CREATE_SEMILLERO',
  UPDATE_SEMILLERO: 'semillero/UPDATE_SEMILLERO',
  DELETE_SEMILLERO: 'semillero/DELETE_SEMILLERO',
  RESET: 'semillero/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISemillero>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SemilleroState = Readonly<typeof initialState>;

// Reducer

export default (state: SemilleroState = initialState, action): SemilleroState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SEMILLERO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SEMILLERO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SEMILLERO):
    case REQUEST(ACTION_TYPES.UPDATE_SEMILLERO):
    case REQUEST(ACTION_TYPES.DELETE_SEMILLERO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SEMILLERO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SEMILLERO):
    case FAILURE(ACTION_TYPES.CREATE_SEMILLERO):
    case FAILURE(ACTION_TYPES.UPDATE_SEMILLERO):
    case FAILURE(ACTION_TYPES.DELETE_SEMILLERO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEMILLERO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEMILLERO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SEMILLERO):
    case SUCCESS(ACTION_TYPES.UPDATE_SEMILLERO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SEMILLERO):
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

const apiUrl = 'api/semilleros';

// Actions

export const getEntities: ICrudGetAllAction<ISemillero> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SEMILLERO_LIST,
  payload: axios.get<ISemillero>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISemillero> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SEMILLERO,
    payload: axios.get<ISemillero>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISemillero> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SEMILLERO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISemillero> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SEMILLERO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISemillero> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SEMILLERO,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

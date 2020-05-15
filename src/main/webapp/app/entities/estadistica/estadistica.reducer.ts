import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEstadistica, defaultValue } from 'app/shared/model/estadistica.model';

export const ACTION_TYPES = {
  FETCH_ESTADISTICA_LIST: 'estadistica/FETCH_ESTADISTICA_LIST',
  FETCH_ESTADISTICA: 'estadistica/FETCH_ESTADISTICA',
  CREATE_ESTADISTICA: 'estadistica/CREATE_ESTADISTICA',
  UPDATE_ESTADISTICA: 'estadistica/UPDATE_ESTADISTICA',
  DELETE_ESTADISTICA: 'estadistica/DELETE_ESTADISTICA',
  RESET: 'estadistica/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEstadistica>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EstadisticaState = Readonly<typeof initialState>;

// Reducer

export default (state: EstadisticaState = initialState, action): EstadisticaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ESTADISTICA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESTADISTICA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ESTADISTICA):
    case REQUEST(ACTION_TYPES.UPDATE_ESTADISTICA):
    case REQUEST(ACTION_TYPES.DELETE_ESTADISTICA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ESTADISTICA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESTADISTICA):
    case FAILURE(ACTION_TYPES.CREATE_ESTADISTICA):
    case FAILURE(ACTION_TYPES.UPDATE_ESTADISTICA):
    case FAILURE(ACTION_TYPES.DELETE_ESTADISTICA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESTADISTICA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESTADISTICA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESTADISTICA):
    case SUCCESS(ACTION_TYPES.UPDATE_ESTADISTICA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESTADISTICA):
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

const apiUrl = 'api/estadisticas';

// Actions

export const getEntities: ICrudGetAllAction<IEstadistica> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ESTADISTICA_LIST,
  payload: axios.get<IEstadistica>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEstadistica> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESTADISTICA,
    payload: axios.get<IEstadistica>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEstadistica> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESTADISTICA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEstadistica> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESTADISTICA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEstadistica> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESTADISTICA,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAreaConocimiento, defaultValue } from 'app/shared/model/area-conocimiento.model';

export const ACTION_TYPES = {
  FETCH_AREACONOCIMIENTO_LIST: 'areaConocimiento/FETCH_AREACONOCIMIENTO_LIST',
  FETCH_AREACONOCIMIENTO: 'areaConocimiento/FETCH_AREACONOCIMIENTO',
  CREATE_AREACONOCIMIENTO: 'areaConocimiento/CREATE_AREACONOCIMIENTO',
  UPDATE_AREACONOCIMIENTO: 'areaConocimiento/UPDATE_AREACONOCIMIENTO',
  DELETE_AREACONOCIMIENTO: 'areaConocimiento/DELETE_AREACONOCIMIENTO',
  RESET: 'areaConocimiento/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAreaConocimiento>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AreaConocimientoState = Readonly<typeof initialState>;

// Reducer

export default (state: AreaConocimientoState = initialState, action): AreaConocimientoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AREACONOCIMIENTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AREACONOCIMIENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AREACONOCIMIENTO):
    case REQUEST(ACTION_TYPES.UPDATE_AREACONOCIMIENTO):
    case REQUEST(ACTION_TYPES.DELETE_AREACONOCIMIENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AREACONOCIMIENTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AREACONOCIMIENTO):
    case FAILURE(ACTION_TYPES.CREATE_AREACONOCIMIENTO):
    case FAILURE(ACTION_TYPES.UPDATE_AREACONOCIMIENTO):
    case FAILURE(ACTION_TYPES.DELETE_AREACONOCIMIENTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AREACONOCIMIENTO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AREACONOCIMIENTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AREACONOCIMIENTO):
    case SUCCESS(ACTION_TYPES.UPDATE_AREACONOCIMIENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AREACONOCIMIENTO):
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

const apiUrl = 'api/area-conocimientos';

// Actions

export const getEntities: ICrudGetAllAction<IAreaConocimiento> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AREACONOCIMIENTO_LIST,
  payload: axios.get<IAreaConocimiento>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAreaConocimiento> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AREACONOCIMIENTO,
    payload: axios.get<IAreaConocimiento>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAreaConocimiento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AREACONOCIMIENTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAreaConocimiento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AREACONOCIMIENTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAreaConocimiento> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AREACONOCIMIENTO,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

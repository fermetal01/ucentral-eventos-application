import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInstitucion, defaultValue } from 'app/shared/model/institucion.model';

export const ACTION_TYPES = {
  FETCH_INSTITUCION_LIST: 'institucion/FETCH_INSTITUCION_LIST',
  FETCH_INSTITUCION: 'institucion/FETCH_INSTITUCION',
  CREATE_INSTITUCION: 'institucion/CREATE_INSTITUCION',
  UPDATE_INSTITUCION: 'institucion/UPDATE_INSTITUCION',
  DELETE_INSTITUCION: 'institucion/DELETE_INSTITUCION',
  RESET: 'institucion/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInstitucion>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type InstitucionState = Readonly<typeof initialState>;

// Reducer

export default (state: InstitucionState = initialState, action): InstitucionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INSTITUCION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INSTITUCION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INSTITUCION):
    case REQUEST(ACTION_TYPES.UPDATE_INSTITUCION):
    case REQUEST(ACTION_TYPES.DELETE_INSTITUCION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INSTITUCION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INSTITUCION):
    case FAILURE(ACTION_TYPES.CREATE_INSTITUCION):
    case FAILURE(ACTION_TYPES.UPDATE_INSTITUCION):
    case FAILURE(ACTION_TYPES.DELETE_INSTITUCION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INSTITUCION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_INSTITUCION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INSTITUCION):
    case SUCCESS(ACTION_TYPES.UPDATE_INSTITUCION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INSTITUCION):
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

const apiUrl = 'api/institucions';

// Actions

export const getEntities: ICrudGetAllAction<IInstitucion> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INSTITUCION_LIST,
  payload: axios.get<IInstitucion>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IInstitucion> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INSTITUCION,
    payload: axios.get<IInstitucion>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IInstitucion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INSTITUCION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInstitucion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INSTITUCION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInstitucion> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INSTITUCION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

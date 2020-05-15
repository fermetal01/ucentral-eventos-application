import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInscripcion, defaultValue } from 'app/shared/model/inscripcion.model';

export const ACTION_TYPES = {
  FETCH_INSCRIPCION_LIST: 'inscripcion/FETCH_INSCRIPCION_LIST',
  FETCH_INSCRIPCION: 'inscripcion/FETCH_INSCRIPCION',
  CREATE_INSCRIPCION: 'inscripcion/CREATE_INSCRIPCION',
  UPDATE_INSCRIPCION: 'inscripcion/UPDATE_INSCRIPCION',
  DELETE_INSCRIPCION: 'inscripcion/DELETE_INSCRIPCION',
  RESET: 'inscripcion/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInscripcion>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type InscripcionState = Readonly<typeof initialState>;

// Reducer

export default (state: InscripcionState = initialState, action): InscripcionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INSCRIPCION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INSCRIPCION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INSCRIPCION):
    case REQUEST(ACTION_TYPES.UPDATE_INSCRIPCION):
    case REQUEST(ACTION_TYPES.DELETE_INSCRIPCION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INSCRIPCION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INSCRIPCION):
    case FAILURE(ACTION_TYPES.CREATE_INSCRIPCION):
    case FAILURE(ACTION_TYPES.UPDATE_INSCRIPCION):
    case FAILURE(ACTION_TYPES.DELETE_INSCRIPCION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INSCRIPCION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_INSCRIPCION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INSCRIPCION):
    case SUCCESS(ACTION_TYPES.UPDATE_INSCRIPCION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INSCRIPCION):
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

const apiUrl = 'api/inscripcions';

// Actions

export const getEntities: ICrudGetAllAction<IInscripcion> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INSCRIPCION_LIST,
  payload: axios.get<IInscripcion>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IInscripcion> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INSCRIPCION,
    payload: axios.get<IInscripcion>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IInscripcion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INSCRIPCION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInscripcion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INSCRIPCION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInscripcion> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INSCRIPCION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

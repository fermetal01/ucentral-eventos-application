import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEvaluacion, defaultValue } from 'app/shared/model/evaluacion.model';

export const ACTION_TYPES = {
  FETCH_EVALUACION_LIST: 'evaluacion/FETCH_EVALUACION_LIST',
  FETCH_EVALUACION: 'evaluacion/FETCH_EVALUACION',
  CREATE_EVALUACION: 'evaluacion/CREATE_EVALUACION',
  UPDATE_EVALUACION: 'evaluacion/UPDATE_EVALUACION',
  DELETE_EVALUACION: 'evaluacion/DELETE_EVALUACION',
  RESET: 'evaluacion/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEvaluacion>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EvaluacionState = Readonly<typeof initialState>;

// Reducer

export default (state: EvaluacionState = initialState, action): EvaluacionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EVALUACION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EVALUACION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EVALUACION):
    case REQUEST(ACTION_TYPES.UPDATE_EVALUACION):
    case REQUEST(ACTION_TYPES.DELETE_EVALUACION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EVALUACION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EVALUACION):
    case FAILURE(ACTION_TYPES.CREATE_EVALUACION):
    case FAILURE(ACTION_TYPES.UPDATE_EVALUACION):
    case FAILURE(ACTION_TYPES.DELETE_EVALUACION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVALUACION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVALUACION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EVALUACION):
    case SUCCESS(ACTION_TYPES.UPDATE_EVALUACION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EVALUACION):
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

const apiUrl = 'api/evaluacions';

// Actions

export const getEntities: ICrudGetAllAction<IEvaluacion> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EVALUACION_LIST,
  payload: axios.get<IEvaluacion>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEvaluacion> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EVALUACION,
    payload: axios.get<IEvaluacion>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEvaluacion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EVALUACION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEvaluacion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EVALUACION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEvaluacion> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EVALUACION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

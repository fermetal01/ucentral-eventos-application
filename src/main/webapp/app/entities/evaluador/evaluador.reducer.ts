import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEvaluador, defaultValue } from 'app/shared/model/evaluador.model';

export const ACTION_TYPES = {
  FETCH_EVALUADOR_LIST: 'evaluador/FETCH_EVALUADOR_LIST',
  FETCH_EVALUADOR: 'evaluador/FETCH_EVALUADOR',
  CREATE_EVALUADOR: 'evaluador/CREATE_EVALUADOR',
  UPDATE_EVALUADOR: 'evaluador/UPDATE_EVALUADOR',
  DELETE_EVALUADOR: 'evaluador/DELETE_EVALUADOR',
  RESET: 'evaluador/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEvaluador>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EvaluadorState = Readonly<typeof initialState>;

// Reducer

export default (state: EvaluadorState = initialState, action): EvaluadorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EVALUADOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EVALUADOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EVALUADOR):
    case REQUEST(ACTION_TYPES.UPDATE_EVALUADOR):
    case REQUEST(ACTION_TYPES.DELETE_EVALUADOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EVALUADOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EVALUADOR):
    case FAILURE(ACTION_TYPES.CREATE_EVALUADOR):
    case FAILURE(ACTION_TYPES.UPDATE_EVALUADOR):
    case FAILURE(ACTION_TYPES.DELETE_EVALUADOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVALUADOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVALUADOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EVALUADOR):
    case SUCCESS(ACTION_TYPES.UPDATE_EVALUADOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EVALUADOR):
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

const apiUrl = 'api/evaluadors';

// Actions

export const getEntities: ICrudGetAllAction<IEvaluador> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EVALUADOR_LIST,
  payload: axios.get<IEvaluador>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEvaluador> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EVALUADOR,
    payload: axios.get<IEvaluador>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEvaluador> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EVALUADOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEvaluador> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EVALUADOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEvaluador> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EVALUADOR,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

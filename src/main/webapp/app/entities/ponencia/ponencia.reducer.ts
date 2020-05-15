import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPonencia, defaultValue } from 'app/shared/model/ponencia.model';

export const ACTION_TYPES = {
  FETCH_PONENCIA_LIST: 'ponencia/FETCH_PONENCIA_LIST',
  FETCH_PONENCIA: 'ponencia/FETCH_PONENCIA',
  CREATE_PONENCIA: 'ponencia/CREATE_PONENCIA',
  UPDATE_PONENCIA: 'ponencia/UPDATE_PONENCIA',
  DELETE_PONENCIA: 'ponencia/DELETE_PONENCIA',
  RESET: 'ponencia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPonencia>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PonenciaState = Readonly<typeof initialState>;

// Reducer

export default (state: PonenciaState = initialState, action): PonenciaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PONENCIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PONENCIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PONENCIA):
    case REQUEST(ACTION_TYPES.UPDATE_PONENCIA):
    case REQUEST(ACTION_TYPES.DELETE_PONENCIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PONENCIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PONENCIA):
    case FAILURE(ACTION_TYPES.CREATE_PONENCIA):
    case FAILURE(ACTION_TYPES.UPDATE_PONENCIA):
    case FAILURE(ACTION_TYPES.DELETE_PONENCIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PONENCIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PONENCIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PONENCIA):
    case SUCCESS(ACTION_TYPES.UPDATE_PONENCIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PONENCIA):
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

const apiUrl = 'api/ponencias';

// Actions

export const getEntities: ICrudGetAllAction<IPonencia> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PONENCIA_LIST,
  payload: axios.get<IPonencia>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPonencia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PONENCIA,
    payload: axios.get<IPonencia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPonencia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PONENCIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPonencia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PONENCIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPonencia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PONENCIA,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

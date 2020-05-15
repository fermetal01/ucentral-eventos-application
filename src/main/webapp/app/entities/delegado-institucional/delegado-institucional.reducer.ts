import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDelegadoInstitucional, defaultValue } from 'app/shared/model/delegado-institucional.model';

export const ACTION_TYPES = {
  FETCH_DELEGADOINSTITUCIONAL_LIST: 'delegadoInstitucional/FETCH_DELEGADOINSTITUCIONAL_LIST',
  FETCH_DELEGADOINSTITUCIONAL: 'delegadoInstitucional/FETCH_DELEGADOINSTITUCIONAL',
  CREATE_DELEGADOINSTITUCIONAL: 'delegadoInstitucional/CREATE_DELEGADOINSTITUCIONAL',
  UPDATE_DELEGADOINSTITUCIONAL: 'delegadoInstitucional/UPDATE_DELEGADOINSTITUCIONAL',
  DELETE_DELEGADOINSTITUCIONAL: 'delegadoInstitucional/DELETE_DELEGADOINSTITUCIONAL',
  RESET: 'delegadoInstitucional/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDelegadoInstitucional>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DelegadoInstitucionalState = Readonly<typeof initialState>;

// Reducer

export default (state: DelegadoInstitucionalState = initialState, action): DelegadoInstitucionalState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DELEGADOINSTITUCIONAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DELEGADOINSTITUCIONAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DELEGADOINSTITUCIONAL):
    case REQUEST(ACTION_TYPES.UPDATE_DELEGADOINSTITUCIONAL):
    case REQUEST(ACTION_TYPES.DELETE_DELEGADOINSTITUCIONAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DELEGADOINSTITUCIONAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DELEGADOINSTITUCIONAL):
    case FAILURE(ACTION_TYPES.CREATE_DELEGADOINSTITUCIONAL):
    case FAILURE(ACTION_TYPES.UPDATE_DELEGADOINSTITUCIONAL):
    case FAILURE(ACTION_TYPES.DELETE_DELEGADOINSTITUCIONAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DELEGADOINSTITUCIONAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DELEGADOINSTITUCIONAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DELEGADOINSTITUCIONAL):
    case SUCCESS(ACTION_TYPES.UPDATE_DELEGADOINSTITUCIONAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DELEGADOINSTITUCIONAL):
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

const apiUrl = 'api/delegado-institucionals';

// Actions

export const getEntities: ICrudGetAllAction<IDelegadoInstitucional> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DELEGADOINSTITUCIONAL_LIST,
  payload: axios.get<IDelegadoInstitucional>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDelegadoInstitucional> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DELEGADOINSTITUCIONAL,
    payload: axios.get<IDelegadoInstitucional>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDelegadoInstitucional> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DELEGADOINSTITUCIONAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDelegadoInstitucional> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DELEGADOINSTITUCIONAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDelegadoInstitucional> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DELEGADOINSTITUCIONAL,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRegla, defaultValue } from 'app/shared/model/regla.model';

export const ACTION_TYPES = {
  FETCH_REGLA_LIST: 'regla/FETCH_REGLA_LIST',
  FETCH_REGLA: 'regla/FETCH_REGLA',
  CREATE_REGLA: 'regla/CREATE_REGLA',
  UPDATE_REGLA: 'regla/UPDATE_REGLA',
  DELETE_REGLA: 'regla/DELETE_REGLA',
  RESET: 'regla/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRegla>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ReglaState = Readonly<typeof initialState>;

// Reducer

export default (state: ReglaState = initialState, action): ReglaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REGLA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REGLA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REGLA):
    case REQUEST(ACTION_TYPES.UPDATE_REGLA):
    case REQUEST(ACTION_TYPES.DELETE_REGLA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REGLA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REGLA):
    case FAILURE(ACTION_TYPES.CREATE_REGLA):
    case FAILURE(ACTION_TYPES.UPDATE_REGLA):
    case FAILURE(ACTION_TYPES.DELETE_REGLA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REGLA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REGLA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REGLA):
    case SUCCESS(ACTION_TYPES.UPDATE_REGLA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REGLA):
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

const apiUrl = 'api/reglas';

// Actions

export const getEntities: ICrudGetAllAction<IRegla> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REGLA_LIST,
  payload: axios.get<IRegla>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRegla> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REGLA,
    payload: axios.get<IRegla>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRegla> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REGLA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRegla> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REGLA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRegla> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REGLA,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

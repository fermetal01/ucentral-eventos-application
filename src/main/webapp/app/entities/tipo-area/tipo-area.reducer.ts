import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoArea, defaultValue } from 'app/shared/model/tipo-area.model';

export const ACTION_TYPES = {
  FETCH_TIPOAREA_LIST: 'tipoArea/FETCH_TIPOAREA_LIST',
  FETCH_TIPOAREA: 'tipoArea/FETCH_TIPOAREA',
  CREATE_TIPOAREA: 'tipoArea/CREATE_TIPOAREA',
  UPDATE_TIPOAREA: 'tipoArea/UPDATE_TIPOAREA',
  DELETE_TIPOAREA: 'tipoArea/DELETE_TIPOAREA',
  RESET: 'tipoArea/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoArea>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TipoAreaState = Readonly<typeof initialState>;

// Reducer

export default (state: TipoAreaState = initialState, action): TipoAreaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPOAREA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPOAREA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPOAREA):
    case REQUEST(ACTION_TYPES.UPDATE_TIPOAREA):
    case REQUEST(ACTION_TYPES.DELETE_TIPOAREA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPOAREA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPOAREA):
    case FAILURE(ACTION_TYPES.CREATE_TIPOAREA):
    case FAILURE(ACTION_TYPES.UPDATE_TIPOAREA):
    case FAILURE(ACTION_TYPES.DELETE_TIPOAREA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOAREA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOAREA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPOAREA):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPOAREA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPOAREA):
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

const apiUrl = 'api/tipo-areas';

// Actions

export const getEntities: ICrudGetAllAction<ITipoArea> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TIPOAREA_LIST,
  payload: axios.get<ITipoArea>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITipoArea> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOAREA,
    payload: axios.get<ITipoArea>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITipoArea> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPOAREA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoArea> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPOAREA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoArea> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPOAREA,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

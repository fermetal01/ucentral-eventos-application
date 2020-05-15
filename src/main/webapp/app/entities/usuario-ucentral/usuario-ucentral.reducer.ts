import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUsuarioUcentral, defaultValue } from 'app/shared/model/usuario-ucentral.model';

export const ACTION_TYPES = {
  FETCH_USUARIOUCENTRAL_LIST: 'usuarioUcentral/FETCH_USUARIOUCENTRAL_LIST',
  FETCH_USUARIOUCENTRAL: 'usuarioUcentral/FETCH_USUARIOUCENTRAL',
  CREATE_USUARIOUCENTRAL: 'usuarioUcentral/CREATE_USUARIOUCENTRAL',
  UPDATE_USUARIOUCENTRAL: 'usuarioUcentral/UPDATE_USUARIOUCENTRAL',
  DELETE_USUARIOUCENTRAL: 'usuarioUcentral/DELETE_USUARIOUCENTRAL',
  RESET: 'usuarioUcentral/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUsuarioUcentral>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UsuarioUcentralState = Readonly<typeof initialState>;

// Reducer

export default (state: UsuarioUcentralState = initialState, action): UsuarioUcentralState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USUARIOUCENTRAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USUARIOUCENTRAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USUARIOUCENTRAL):
    case REQUEST(ACTION_TYPES.UPDATE_USUARIOUCENTRAL):
    case REQUEST(ACTION_TYPES.DELETE_USUARIOUCENTRAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USUARIOUCENTRAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USUARIOUCENTRAL):
    case FAILURE(ACTION_TYPES.CREATE_USUARIOUCENTRAL):
    case FAILURE(ACTION_TYPES.UPDATE_USUARIOUCENTRAL):
    case FAILURE(ACTION_TYPES.DELETE_USUARIOUCENTRAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USUARIOUCENTRAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USUARIOUCENTRAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USUARIOUCENTRAL):
    case SUCCESS(ACTION_TYPES.UPDATE_USUARIOUCENTRAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USUARIOUCENTRAL):
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

const apiUrl = 'api/usuario-ucentrals';

// Actions

export const getEntities: ICrudGetAllAction<IUsuarioUcentral> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USUARIOUCENTRAL_LIST,
  payload: axios.get<IUsuarioUcentral>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IUsuarioUcentral> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOUCENTRAL,
    payload: axios.get<IUsuarioUcentral>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUsuarioUcentral> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USUARIOUCENTRAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUsuarioUcentral> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USUARIOUCENTRAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUsuarioUcentral> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USUARIOUCENTRAL,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

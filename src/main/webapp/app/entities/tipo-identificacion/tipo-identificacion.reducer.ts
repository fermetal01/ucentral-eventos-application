import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoIdentificacion, defaultValue } from 'app/shared/model/tipo-identificacion.model';

export const ACTION_TYPES = {
  FETCH_TIPOIDENTIFICACION_LIST: 'tipoIdentificacion/FETCH_TIPOIDENTIFICACION_LIST',
  FETCH_TIPOIDENTIFICACION: 'tipoIdentificacion/FETCH_TIPOIDENTIFICACION',
  CREATE_TIPOIDENTIFICACION: 'tipoIdentificacion/CREATE_TIPOIDENTIFICACION',
  UPDATE_TIPOIDENTIFICACION: 'tipoIdentificacion/UPDATE_TIPOIDENTIFICACION',
  DELETE_TIPOIDENTIFICACION: 'tipoIdentificacion/DELETE_TIPOIDENTIFICACION',
  RESET: 'tipoIdentificacion/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoIdentificacion>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TipoIdentificacionState = Readonly<typeof initialState>;

// Reducer

export default (state: TipoIdentificacionState = initialState, action): TipoIdentificacionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPOIDENTIFICACION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPOIDENTIFICACION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPOIDENTIFICACION):
    case REQUEST(ACTION_TYPES.UPDATE_TIPOIDENTIFICACION):
    case REQUEST(ACTION_TYPES.DELETE_TIPOIDENTIFICACION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPOIDENTIFICACION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPOIDENTIFICACION):
    case FAILURE(ACTION_TYPES.CREATE_TIPOIDENTIFICACION):
    case FAILURE(ACTION_TYPES.UPDATE_TIPOIDENTIFICACION):
    case FAILURE(ACTION_TYPES.DELETE_TIPOIDENTIFICACION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOIDENTIFICACION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOIDENTIFICACION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPOIDENTIFICACION):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPOIDENTIFICACION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPOIDENTIFICACION):
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

const apiUrl = 'api/tipo-identificacions';

// Actions

export const getEntities: ICrudGetAllAction<ITipoIdentificacion> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TIPOIDENTIFICACION_LIST,
  payload: axios.get<ITipoIdentificacion>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITipoIdentificacion> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOIDENTIFICACION,
    payload: axios.get<ITipoIdentificacion>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITipoIdentificacion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPOIDENTIFICACION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoIdentificacion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPOIDENTIFICACION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoIdentificacion> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPOIDENTIFICACION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

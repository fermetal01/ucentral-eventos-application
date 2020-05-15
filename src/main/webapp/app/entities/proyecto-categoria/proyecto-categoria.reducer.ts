import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProyectoCategoria, defaultValue } from 'app/shared/model/proyecto-categoria.model';

export const ACTION_TYPES = {
  FETCH_PROYECTOCATEGORIA_LIST: 'proyectoCategoria/FETCH_PROYECTOCATEGORIA_LIST',
  FETCH_PROYECTOCATEGORIA: 'proyectoCategoria/FETCH_PROYECTOCATEGORIA',
  CREATE_PROYECTOCATEGORIA: 'proyectoCategoria/CREATE_PROYECTOCATEGORIA',
  UPDATE_PROYECTOCATEGORIA: 'proyectoCategoria/UPDATE_PROYECTOCATEGORIA',
  DELETE_PROYECTOCATEGORIA: 'proyectoCategoria/DELETE_PROYECTOCATEGORIA',
  RESET: 'proyectoCategoria/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProyectoCategoria>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProyectoCategoriaState = Readonly<typeof initialState>;

// Reducer

export default (state: ProyectoCategoriaState = initialState, action): ProyectoCategoriaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROYECTOCATEGORIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROYECTOCATEGORIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROYECTOCATEGORIA):
    case REQUEST(ACTION_TYPES.UPDATE_PROYECTOCATEGORIA):
    case REQUEST(ACTION_TYPES.DELETE_PROYECTOCATEGORIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROYECTOCATEGORIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROYECTOCATEGORIA):
    case FAILURE(ACTION_TYPES.CREATE_PROYECTOCATEGORIA):
    case FAILURE(ACTION_TYPES.UPDATE_PROYECTOCATEGORIA):
    case FAILURE(ACTION_TYPES.DELETE_PROYECTOCATEGORIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROYECTOCATEGORIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROYECTOCATEGORIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROYECTOCATEGORIA):
    case SUCCESS(ACTION_TYPES.UPDATE_PROYECTOCATEGORIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROYECTOCATEGORIA):
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

const apiUrl = 'api/proyecto-categorias';

// Actions

export const getEntities: ICrudGetAllAction<IProyectoCategoria> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROYECTOCATEGORIA_LIST,
  payload: axios.get<IProyectoCategoria>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProyectoCategoria> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROYECTOCATEGORIA,
    payload: axios.get<IProyectoCategoria>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProyectoCategoria> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROYECTOCATEGORIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProyectoCategoria> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROYECTOCATEGORIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProyectoCategoria> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROYECTOCATEGORIA,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

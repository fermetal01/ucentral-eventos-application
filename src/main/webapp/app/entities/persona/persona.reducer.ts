import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPersona, defaultValue } from 'app/shared/model/persona.model';

export const ACTION_TYPES = {
  FETCH_PERSONA_LIST: 'persona/FETCH_PERSONA_LIST',
  FETCH_PERSONA: 'persona/FETCH_PERSONA',
  CREATE_PERSONA: 'persona/CREATE_PERSONA',
  UPDATE_PERSONA: 'persona/UPDATE_PERSONA',
  DELETE_PERSONA: 'persona/DELETE_PERSONA',
  RESET: 'persona/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPersona>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PersonaState = Readonly<typeof initialState>;

// Reducer

export default (state: PersonaState = initialState, action): PersonaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PERSONA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PERSONA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PERSONA):
    case REQUEST(ACTION_TYPES.UPDATE_PERSONA):
    case REQUEST(ACTION_TYPES.DELETE_PERSONA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PERSONA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PERSONA):
    case FAILURE(ACTION_TYPES.CREATE_PERSONA):
    case FAILURE(ACTION_TYPES.UPDATE_PERSONA):
    case FAILURE(ACTION_TYPES.DELETE_PERSONA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PERSONA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PERSONA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PERSONA):
    case SUCCESS(ACTION_TYPES.UPDATE_PERSONA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PERSONA):
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

const apiUrl = 'api/personas';

// Actions

export const getEntities: ICrudGetAllAction<IPersona> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PERSONA_LIST,
  payload: axios.get<IPersona>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPersona> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PERSONA,
    payload: axios.get<IPersona>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPersona> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PERSONA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPersona> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PERSONA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPersona> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PERSONA,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

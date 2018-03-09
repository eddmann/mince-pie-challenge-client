import { combineReducers } from 'redux';

const urls = (state = { addUrl: '', browseUrl: '', viewTemplateUrl: '' }, action) => {
  switch (action.type) {
    case 'LOAD_URLS':
      return { ...action.urls };
    default:
      return state;
  }
};

const registration = (state = { isRegistering: false, error: '', username: '' }, action) => {
  switch (action.type) {
    case 'SUBMIT_REGISTRATION':
      return { ...state, isRegistering: true, error: '' };
    case 'REGISTRATION_SUCCESS':
      return { isRegistering: false, error: '', username: action.username };
    case 'REGISTRATION_ERROR':
      return { ...state, isRegistering: false, error: action.error };
    case 'CONFIRM_REGISTRATION':
      return { ...state, isRegistering: true, error: '' };
    case 'REGISTRATION_CONFIRMATION_SUCCESS':
      return { isRegistering: false, error: '', username: '' };
    case 'REGISTRATION_CONFIRMATION_ERROR':
      return { ...state, isRegistering: false, error: action.error };
    default:
      return state;
  }
};

const login = (state = { isLoggingIn: false, error: '' }, action) => {
  switch (action.type) {
    case 'ATTEMPT_LOGIN':
      return { isLoggingIn: true, error: '' };
    case 'LOGIN_SUCCESS':
      return { isLoggingIn: false, error: '' };
    case 'LOGIN_FAILURE':
      return { isLoggingIn: false, error: action.error };
    default:
      return state;
  }
};

const isAuthenticated = (state = false, action) => {
  switch (action.type) {
    case 'AUTHENTICATED':
    case 'LOGIN_SUCCESS':
      return true;
    case 'LOGOUT_SUCCESS':
      return false;
    default:
      return state;
  }
};

const successMessage = (state = '', action) => {
  switch (action.type) {
    case 'REGISTRATION_CONFIRMATION_SUCCESS':
      return 'Successfully registered a new account.';
    case 'LOGIN_SUCCESS':
      return 'Successfully logged in.';
    case 'LOGOUT_SUCCESS':
      return 'Successfully logged out.';
    case 'ADD_PIE_SUCCESS':
      return "Successfully added a new pie's details.";
    case 'UPLOAD_PHOTO_SUCCESS':
      return "Successfully uploaded a new pie's photo.";
    case 'RATE_PIE_SUCCESS':
      return 'Successfully rated the pie.';
    case 'REMOVE_PIE_SUCCESS':
      return 'Successfully removed the pie.';
    case 'CLEAR_SUCCESS_MESSAGE':
      return '';
    default:
      return state;
  }
};

const add = (state = { isAdding: false, error: '' }, action) => {
  switch (action.type) {
    case 'ADD_PIE':
      return { isAdding: true, error: '' };
    case 'ADD_PIE_SUCCESS':
      return { isAdding: false, error: '' };
    case 'ADD_PIE_FAILURE':
      return { isAdding: false, error: action.error };
    default:
      return state;
  }
};

const initPhotoState = {
  error: '',
  isProcessing: false,
  pendingPieId: '',
  photoUploadUrl: '',
};
const photo = (state = initPhotoState, action) => {
  switch (action.type) {
    case 'ADD_PIE_SUCCESS':
      return { ...state, pendingPieId: action.pendingPieId, photoRequestUrl: action.photoRequestUrl };
    case 'UPLOAD_PHOTO':
      return { ...state, isProcessing: true, error: '' };
    case 'UPLOAD_PHOTO_SUCCESS':
      return initPhotoState;
    case 'UPLOAD_PHOTO_FAILURE':
      return { ...state, isProcessing: false, error: action.error };
    default:
      return state;
  }
};

const pies = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PIES_SUCCESS':
      return action.pies.reduce((pies, pie) => {
        return {
          ...pies,
          [pie.id]: {
            ...pies[pie.id],
            id: pie.id,
            name: pie.name,
            thumbnail: pie.thumbnail,
            rating: pie.rating,
          },
        };
      }, state);
    case 'FETCH_PIE_SUCCESS':
      return {
        ...state,
        [action.pie.id]: { ...action.pie },
      };
    default:
      return state;
  }
};

const browse = (state = { listing: [], isFetching: false, error: '' }, action) => {
  switch (action.type) {
    case 'FETCH_PIES':
      return { ...state, isFetching: true, error: '' };
    case 'FETCH_PIES_FAILURE':
      return { ...state, isFetching: false, error: action.error };
    case 'FETCH_PIES_SUCCESS':
      return { listing: action.pies.map(({ id }) => id), isFetching: false, error: '' };
    default:
      return state;
  }
};

const initViewState = {
  isFetching: false,
  isRating: false,
  isRemoving: false,
  error: '',
};
const view = (state = initViewState, action) => {
  switch (action.type) {
    case 'FETCH_PIE':
      return { ...state, isFetching: true };
    case 'FETCH_PIE_FAILURE':
      return { ...state, isFetching: false, error: action.error };
    case 'FETCH_PIE_SUCCESS':
      return initViewState;
    case 'REMOVE_PIE':
      return { ...state, isRemoving: true };
    case 'REMOVE_PIE_SUCCESS':
      return { ...state, isRemoving: false };
    case 'REMOVE_PIE_FAILUE':
      return { ...state, isRemoving: false, error: action.error };
    case 'RATE_PIE':
      return { ...state, isRating: true };
    case 'RATE_PIE_SUCCESS':
      return { ...state, isRating: false };
    case 'RATE_PIE_FAILURE':
      return { ...state, isRating: false, error: action.error };
    default:
      return state;
  }
};

export default combineReducers({
  urls,
  registration,
  successMessage,
  login,
  isAuthenticated,
  add,
  photo,
  browse,
  view,
  pies,
});

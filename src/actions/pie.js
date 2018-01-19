/* global fetch */

import { api, upload } from '../libs/request';
import { push } from 'react-router-redux';

export const loadUrls = (addUrl, browseUrl, viewTemplateUrl) => {
  return { type: 'LOAD_URLS', urls: { addUrl, browseUrl, viewTemplateUrl } };
};

export const fetchPies = path => dispatch => {
  dispatch({ type: 'FETCH_PIES' });

  api(path)
    .then(json => {
      const pies = json._embedded.pies.map(pie => ({
        id: pie.id,
        name: pie.name,
        thumbnail: pie.thumbnail,
        rating: pie.rating,
      }));
      dispatch({ type: 'FETCH_PIES_SUCCESS', pies });
    })
    .catch(error => {
      dispatch({ type: 'FETCH_PIES_FAILURE', error: error.message });
    });
};

export const fetchPie = (path, id) => dispatch => {
  dispatch({ type: 'FETCH_PIE' });

  api(path.replace('{id}', id))
    .then(json => {
      const pie = {
        id: json.id,
        name: json.name,
        rating: json.rating,
        photo: json.photo,
        thumbnail: json.thumbnail,
        addedAt: json.addedAt,
        rateUrl: json._links.rate && json._links.rate.href,
        removeUrl: json._links.remove && json._links.remove.href,
        photoRequestUrl: json._links.photo && json._links.photo.href,
      };
      dispatch({ type: 'FETCH_PIE_SUCCESS', pie });
    })
    .catch(error => {
      dispatch({ type: 'FETCH_PIE_FAILURE', error: error.message });
    });
};

export const addPie = (path, name) => dispatch => {
  dispatch({ type: 'ADD_PIE' });

  api(path, 'POST', { name })
    .then(json => {
      dispatch({
        type: 'ADD_PIE_SUCCESS',
        pendingPieId: json.id,
        photoRequestUrl: json._links.photo.href
      });
    })
    .catch(error => {
      dispatch({ type: 'ADD_PIE_FAILURE', error: error.message });
    });
};

export const removePie = path => dispatch => {
  dispatch({ type: 'REMOVE_PIE' });

  api(path, 'DELETE')
    .then(() => {
      dispatch({ type: 'REMOVE_PIE_SUCCESS' });
      dispatch(push('/'));
    })
    .catch(error => {
      dispatch({ type: 'REMOVE_PIE_FAILUE', error: error.message });
    });
};

export const ratePie = (pieId, viewPath, ratePath, rating) => dispatch => {
  dispatch({ type: 'RATE_PIE' });

  api(ratePath, 'PUT', { rating })
    .then(() => {
      dispatch({ type: 'RATE_PIE_SUCCESS' });
      dispatch(fetchPie(viewPath, pieId));
    })
    .catch(error => {
      dispatch({ type: 'RATE_PIE_FAILURE', error: error.message });
    });
};

export const requestPhotoUpload = (path, fileExtension, contentType) => dispatch => {
  dispatch({ type: 'REQUEST_PHOTO_UPLOAD' });

  api(path, 'PUT', { fileExtension, contentType })
    .then(json => {
      dispatch({ type: 'REQUEST_PHOTO_UPLOAD_SUCCESS', photoUploadUrl: json.url });
    })
    .catch(error => {
      dispatch({ type: 'REQUEST_PHOTO_UPLOAD_FAILURE', error: error.message });
    });
};

export const uploadPhoto = (id, url, file) => dispatch => {
  dispatch({ type: 'UPLOAD_PHOTO' });

  upload(url, file)
    .then(() => {
      dispatch({ type: 'UPLOAD_PHOTO_SUCCESS' });
      dispatch(push(`/pies/${id}`));
    })
    .catch(error => {
      dispatch({ type: 'UPLOAD_PHOTO_FAILURE', error: error.message });
    });
};

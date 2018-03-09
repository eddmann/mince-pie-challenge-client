export const loadUrls = (addUrl, browseUrl, viewTemplateUrl) => {
  return { type: 'LOAD_URLS', urls: { addUrl, browseUrl, viewTemplateUrl } };
};

export const fetchPies = path => (dispatch, getState, { request }) => {
  dispatch({ type: 'FETCH_PIES' });

  request
    .api(path, 'GET')
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

export const fetchPie = (path, id) => (dispatch, getState, { request }) => {
  dispatch({ type: 'FETCH_PIE' });

  request
    .api(path.replace('{id}', id), 'GET')
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

export const addPie = (path, name) => (dispatch, getState, { request }) => {
  dispatch({ type: 'ADD_PIE' });

  request
    .api(path, 'POST', { name })
    .then(json => {
      dispatch({
        type: 'ADD_PIE_SUCCESS',
        pendingPieId: json.id,
        photoRequestUrl: json._links.photo.href,
      });
    })
    .catch(error => {
      dispatch({ type: 'ADD_PIE_FAILURE', error: error.message });
    });
};

export const removePie = path => (dispatch, getState, { request, push }) => {
  dispatch({ type: 'REMOVE_PIE' });

  request
    .api(path, 'DELETE')
    .then(() => {
      dispatch({ type: 'REMOVE_PIE_SUCCESS' });
      dispatch(push('/'));
    })
    .catch(error => {
      dispatch({ type: 'REMOVE_PIE_FAILUE', error: error.message });
    });
};

export const ratePie = (pieId, viewPath, ratePath, rating) => (dispatch, getState, { request }) => {
  dispatch({ type: 'RATE_PIE' });

  request
    .api(ratePath, 'PUT', { rating })
    .then(() => {
      dispatch({ type: 'RATE_PIE_SUCCESS' });
      dispatch(fetchPie(viewPath, pieId));
    })
    .catch(error => {
      dispatch({ type: 'RATE_PIE_FAILURE', error: error.message });
    });
};

export const uploadPhoto = (id, requestPath, image) => (dispatch, getState, { request, push }) => {
  dispatch({ type: 'UPLOAD_PHOTO' });

  request
    .api(requestPath, 'PUT', {
      fileExtension: image.name.split('.').pop(),
      contentType: image.type,
    })
    .then(({ url }) => request.upload(url, image))
    .then(() => {
      dispatch({ type: 'UPLOAD_PHOTO_SUCCESS' });
      dispatch(push(`/pies/${id}`));
    })
    .catch(error => {
      dispatch({ type: 'UPLOAD_PHOTO_FAILURE', error: error.message });
    });
};

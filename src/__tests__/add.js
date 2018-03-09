import { scenario } from '../__fixtures__/setup';

scenario('adds a mince pie', ({ given, when, then, fixtures: { request, auth, renderApp } }) => {
  const ID = '1234';
  const NAME = 'Super Awesome Mince Pie';
  const PHOTO = { name: 'pie.jpg', type: 'image/jpeg', extension: 'jpg' };
  const REQUEST_URL = 'request.url';
  const UPLOAD_URL = 'upload.url';

  given('a logged in user, on the add page', () => {
    auth.getToken = () => Promise.resolve('SAMPLE_TOKEN');

    request.push({
      path: 'add.url',
      method: 'POST',
      body: { name: NAME },
      response: {
        _links: {
          self: { href: `/pies/${ID}` },
          photo: { href: REQUEST_URL },
        },
        id: ID,
        name: NAME,
        rating: { avg: 0, total: 0 },
        addedAt: new Date('2018-01-01').toISOString(),
      },
    });

    request.push({
      path: REQUEST_URL,
      method: 'PUT',
      body: { fileExtension: PHOTO.extension, contentType: PHOTO.type },
      response: {
        _links: {
          self: { href: REQUEST_URL },
        },
        url: UPLOAD_URL,
      },
    });

    request.push({
      path: UPLOAD_URL,
      method: 'PUT',
      body: PHOTO,
    });

    request.push({
      path: `view.url/${ID}`,
      method: 'GET',
      response: {
        _links: {
          self: { href: `/pies/${ID}` },
          rate: { href: `/pies/${ID}/rate` },
          remove: { href: `/pies/${ID}` },
        },
        id: ID,
        name: NAME,
        rating: { avg: 0, total: 0 },
        photo: 'photo.url',
        thumbnail: 'thumbnail.url',
        addedAt: new Date('2018-01-01').toISOString(),
      },
    });

    return renderApp('/add');
  });

  when('add pie with name', wrapper => {
    wrapper.find('input#name').simulate('change', { target: { id: 'name', value: NAME }});
    wrapper.find('Button').simulate('click');
  });

  when('upload pie photo', wrapper => {
    wrapper.find('input').simulate('change', { target: { files: [ PHOTO ] } });
    wrapper.find('Button').simulate('click');
  });

  then('redirected to new pies detail view', wrapper => {
    expect(wrapper.find('CardContent')).toMatchSnapshot();
  });
});

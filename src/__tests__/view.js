import { scenario } from '../__fixtures__/setup';

scenario('view public mince pie', ({ given, when, then, fixtures: { request, renderApp } }) => {
  const ID = '1234';
  const NAME = 'Awesome Mince Pie';

  given('a mince pie resource', () => {
    request.push({
      path: `view.url/${ID}`,
      method: 'GET',
      response: {
        _links: {
          self: { href: `/pies/${ID}` },
        },
        id: ID,
        name: NAME,
        rating: { avg: 0, total: 0 },
        photo: 'photo.url',
        thumbnail: 'thumbnail.url',
        addedAt: new Date('2018-01-01').toISOString(),
      },
    });
  });

  when('visit mince pies view page', wrapper => renderApp(`/pies/${ID}`));

  then('displays the mince pies details', wrapper => {
    expect(wrapper.find('.Pie')).toMatchSnapshot();
  });
});

scenario('view rateable mince pie', ({ given, when, then, fixtures: { request, auth, renderApp } }) => {
  const ID = '1234';
  const NAME = 'Awesome Mince Pie';

  given('an authenticated user with rateable mince pie resource', () => {
    auth.getToken = () => Promise.resolve('SAMPLE_TOKEN');

    request.push({
      path: `view.url/${ID}`,
      method: 'GET',
      response: {
        _links: {
          self: { href: `/pies/${ID}` },
          rate: { href: `/pies/${ID}/rate` },
        },
        id: ID,
        name: NAME,
        rating: { avg: 0, total: 0 },
        photo: 'photo.url',
        thumbnail: 'thumbnail.url',
        addedAt: new Date('2018-01-01').toISOString(),
      },
    });
  });

  when('visit mince pies view page', wrapper => renderApp(`/pies/${ID}`));

  then('displays the mince pies details with rating capabilities', wrapper => {
    expect(wrapper.find('.Pie')).toMatchSnapshot();
    expect(wrapper.find('Rating').length).toEqual(1);
  });
});

scenario('view own mince pie', ({ given, when, then, fixtures: { request, auth, renderApp } }) => {
  const ID = '1234';
  const NAME = 'Awesome Mince Pie';

  given('an authenticated user with own mince pie resource', () => {
    auth.getToken = () => Promise.resolve('SAMPLE_TOKEN');

    request.push({
      path: `view.url/${ID}`,
      method: 'GET',
      response: {
        _links: {
          self: { href: `/pies/${ID}` },
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
  });

  when('visit mince pies view page', wrapper => renderApp(`/pies/${ID}`));

  then('displays the mince pies details with removal capabilities', wrapper => {
    expect(wrapper.find('.Pie')).toMatchSnapshot();
    expect(wrapper.find('button.negative').length).toEqual(1);
  });
});

scenario('rate mince pie', ({ given, when, then, fixtures: { request, auth, renderApp } }) => {
  const ID = '1234';
  const NAME = 'Awesome Mince Pie';

  given('an authenticated user with rateable mince pie resource', () => {
    auth.getToken = () => Promise.resolve('SAMPLE_TOKEN');

    request.push({
      path: `view.url/${ID}`,
      method: 'GET',
      response: {
        _links: {
          self: { href: `/pies/${ID}` },
          rate: { href: `/pies/${ID}/rate` },
        },
        id: ID,
        name: NAME,
        rating: { avg: 0, total: 0 },
        photo: 'photo.url',
        thumbnail: 'thumbnail.url',
        addedAt: new Date('2018-01-01').toISOString(),
      },
    });

    request.push({
      path: `/pies/${ID}/rate`,
      method: 'PUT',
      body: { rating: 3 },
      response: {},
    });

    request.push({
      path: `view.url/${ID}`,
      method: 'GET',
      response: {
        _links: {
          self: { href: `/pies/${ID}` },
          rate: { href: `/pies/${ID}/rate` },
        },
        id: ID,
        name: NAME,
        rating: { avg: 3, total: 1 },
        photo: 'photo.url',
        thumbnail: 'thumbnail.url',
        addedAt: new Date('2018-01-01').toISOString(),
      },
    });

    return renderApp(`/pies/${ID}`);
  });

  when('attempt to rate the mince pie', wrapper => {
    wrapper.find('Rating RatingIcon').at(2).simulate('click');
  });

  then('rates the mince pie and updates the details view', wrapper => {
    expect(wrapper.find('CardDescription').text()).toEqual('Rated 3/5 from 1 reviews');
  });
});

scenario('remove mince pie', ({ given, when, then, fixtures: { request, auth, renderApp } }) => {
  const ID = '1234';
  const NAME = 'Awesome Mince Pie';

  given('an authenticated user with own mince pie resource', () => {
    auth.getToken = () => Promise.resolve('SAMPLE_TOKEN');

    request.push({
      path: `view.url/${ID}`,
      method: 'GET',
      response: {
        _links: {
          self: { href: `/pies/${ID}` },
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

    request.push({
      path: `/pies/${ID}`,
      method: 'DELETE',
      response: {},
    });

    request.push({
      path: 'list.url',
      method: 'GET',
      response: {
        _links: { self: { href: '/pies' } },
        _embedded: { pies: [] },
        total: 0,
      },
    });

    return renderApp(`/pies/${ID}`);
  });

  when('attempt to remove the mince pie', wrapper => {
    wrapper.find('button.negative').simulate('click');
  });

  then('redirected back to browse listings with mince pie removed', wrapper => {
    expect(wrapper.find('.Browse')).toMatchSnapshot();
    expect(wrapper.find('Card').length).toEqual(0);
  });
});

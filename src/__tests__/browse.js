import { scenario } from '../__fixtures__/setup';

scenario('lists no mince pies', ({ given, when, then, fixtures: { request, renderApp } }) => {
  given('empty mince pie list resource', () => {
    request.push({
      path: 'list.url',
      method: 'GET',
      response: {
        _links: { self: { href: '/pies' } },
        _embedded: { pies: [] },
        total: 0,
      },
    });
  });

  when('visit the browse view', wrapper => renderApp('/'));

  then('no pies are present in listing', wrapper => {
    expect(wrapper.find('CardGroup')).toMatchSnapshot();
    expect(wrapper.find('Card').length).toEqual(0);
  });
});

scenario('lists several mince pies', ({ given, when, then, fixtures: { request, renderApp } }) => {
  given('list resource with several mince pies', () => {
    request.push({
      path: 'list.url',
      method: 'GET',
      response: {
        _links: { self: { href: '/pies' } },
        _embedded: {
          pies: [
            {
              _links: { self: { href: '/pies/1' } },
              id: '1',
              name: 'Awesome Mince Pie',
              thumbnail: 'thumbnail-1.url',
              rating: { avg: 4, total: 2 },
            },
            {
              _links: { self: { href: '/pies/2' } },
              id: '2',
              name: 'Super Mince Pie',
              thumbnail: 'thumbnail-2.url',
              rating: { avg: 3, total: 4 },
            },
          ],
        },
        total: 2,
      },
    });
  });

  when('visit the browse view', wrapper => renderApp('/'));

  then('several mince pies are present in listing', wrapper => {
    expect(wrapper.find('CardGroup')).toMatchSnapshot();
    expect(wrapper.find('Card').length).toEqual(2);
  });
});

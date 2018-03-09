import React from 'react';
import { Browse } from '../Browse';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const ID = '1234';
const NAME = 'Mince Pie';
const BROWSE_URL = 'browse.url';

it('fetches mince pies', () => {
  const fetchPies = jest.fn();
  const wrapper = shallow(<Browse
    fetchPies={fetchPies}
    push={jest.fn()}
    isFetching={true}
    pies={[]}
    browseUrl={BROWSE_URL}
    error={undefined}
  />);

  expect(fetchPies).toBeCalledWith(BROWSE_URL);
  expect(wrapper.find('Loader').length).toEqual(1);
});

it('lists mince pies', () => {
  const wrapper = shallow(<Browse
    fetchPies={jest.fn()}
    push={jest.fn()}
    isFetching={false}
    pies={[
      {
        id: ID,
        name: NAME,
        rating: { avg: 0, total: 0 },
        thumbnail: 'thumbnail.url'
      }
    ]}
    browseUrl={BROWSE_URL}
    error={undefined}
  />);

  expect(wrapper.find('Card').length).toEqual(1);
  expect(wrapper.find('Card')).toMatchSnapshot();
});

it('links to mince pie', () => {
  const push = jest.fn();
  const wrapper = shallow(<Browse
    fetchPies={jest.fn()}
    push={push}
    isFetching={false}
    pies={[
      {
        id: ID,
        name: NAME,
        rating: { avg: 0, total: 0 },
        thumbnail: 'thumbnail.url'
      }
    ]}
    browseUrl={BROWSE_URL}
    error={undefined}
  />);

  wrapper.find('Card').simulate('click', {}, { id: ID });

  expect(push).toBeCalledWith(`/pies/${ID}`);
});

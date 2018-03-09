import React from 'react';
import { Add } from '../Add';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const ID = '1234';
const NAME = 'Mince Pie';
const PHOTO = { name: 'pie.jpg', type: 'image/jpeg', extension: 'jpg' };
const ADD_URL = 'add.url';
const REQUEST_URL = 'request.url';
const UPLOAD_URL = 'upload.url';

it('add the mince pies details', () => {
  const addPie = jest.fn();
  const wrapper = shallow(<Add
    addPie={addPie}
    uploadPhoto={jest.fn()}
    isSubmitting={false}
    error={undefined}
    addUrl={ADD_URL}
    pendingPieId={undefined}
    photoRequestUrl={undefined}
  />);

  wrapper.find('FormInput').simulate('change', { target: { id: 'name', value: NAME }});
  wrapper.find('Button').simulate('click', { preventDefault: jest.fn() });

  expect(addPie).toBeCalledWith(ADD_URL, NAME);
});

it('uploads a mince pies photo', () => {
  const uploadPhoto = jest.fn();
  const wrapper = shallow(<Add
    addPie={jest.fn()}
    uploadPhoto={uploadPhoto}
    isSubmitting={false}
    error={undefined}
    addUrl={ADD_URL}
    pendingPieId={ID}
    photoRequestUrl={REQUEST_URL}
  />);

  wrapper.find('input').simulate('change', { target: { files: [ PHOTO ] } });
  wrapper.find('Button').simulate('click', { preventDefault: jest.fn() });

  expect(uploadPhoto).toBeCalledWith(ID, REQUEST_URL, PHOTO);
});

it('displays add errors', () => {
  const wrapper = shallow(<Add
    addPie={jest.fn()}
    uploadPhoto={jest.fn()}
    isSubmitting={false}
    error={'Error'}
    addUrl={ADD_URL}
    pendingPieId={ID}
    photoRequestUrl={REQUEST_URL}
  />);

  expect(wrapper.find('Message')).toMatchSnapshot();
});

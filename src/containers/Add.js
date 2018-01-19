import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { addPie, requestPhotoUpload, uploadPhoto } from '../actions/pie';

import './Add.css';

class Add extends Component {
  static propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    error: PropTypes.string,
    addUrl: PropTypes.string.isRequired,
    pendingPieId: PropTypes.string,
    photoRequestUrl: PropTypes.string,
    photoUploadUrl: PropTypes.string,
  };

  state = { name: '' };

  onLogin = e => {
    e.preventDefault();
    const { name } = this.state;
    this.props.dispatch(addPie(this.props.addUrl, name));
  };

  onPhotoUploadRequest = e => {
    e.preventDefault();
    const image = this.refs.file.files[0];
    const fileExtension = image.name.split('.').pop();
    const contentType = image.type;
    this.props.dispatch(requestPhotoUpload(this.props.photoRequestUrl, fileExtension, contentType));
  }

  onPhotoUpload = e => {
    e.preventDefault();
    const image = this.refs.file.files[0];
    this.props.dispatch(uploadPhoto(this.props.pendingPieId, this.props.photoUploadUrl, image));
  };

  onFormUpdate = e =>
    this.setState({ [e.target.id]: e.target.value });

  renderAddForm = () => {
    return (
      <Form size='large'>
        <Segment stacked>
          <Form.Input
            fluid id="name" icon='user' iconPosition='left'
            placeholder='Name' value={this.state.name}
            onChange={this.onFormUpdate} />
          <Button
            loading={this.props.isSubmitting} fluid color='blue'
            size='large' onClick={this.onLogin}>Add</Button>
        </Segment>
      </Form>
    );
  };

  renderPhotoUploadForm = () => {
    return (
      <Form size='large'>
        <Segment stacked>
          <input type="file" ref="file" onChange={this.onPhotoUploadRequest} />
          {this.props.photoUploadUrl && <Button
            loading={this.props.isSubmitting} fluid color='blue'
            size='large' onClick={this.onPhotoUpload}>Upload</Button>}
        </Segment>
      </Form>
    );
  };

  render() {
    return (
      <div className="Add">
        <Grid textAlign='center'>
          <Grid.Column className="Form">
            <Header as='h2' color='teal' textAlign='center'>
              {this.props.photoRequestUrl ? 'Upload Photo' : 'Add Pie'}
            </Header>
            {this.props.error && <Message error>{this.props.error}</Message>}
            {this.props.photoRequestUrl ? this.renderPhotoUploadForm() : this.renderAddForm()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ urls, add, photo }) => ({
  isSubmitting: add.isAdding || photo.isProcessing,
  error: add.error || photo.error,
  addUrl: urls.addUrl,
  pendingPieId: photo.pendingPieId,
  photoRequestUrl: photo.photoRequestUrl,
  photoUploadUrl: photo.photoUploadUrl,
});

export default connect(mapStateToProps)(Add);

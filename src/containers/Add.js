import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { addPie, uploadPhoto } from '../actions/pie';

import './Add.css';

export class Add extends Component {
  static propTypes = {
    addPie: PropTypes.func.isRequired,
    uploadPhoto: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    error: PropTypes.string,
    addUrl: PropTypes.string.isRequired,
    pendingPieId: PropTypes.string,
    photoRequestUrl: PropTypes.string,
  };

  state = {
    name: '',
    photo: undefined,
  };

  onAdd = e => {
    e.preventDefault();
    const { name } = this.state;
    this.props.addPie(this.props.addUrl, name);
  };

  onPhotoSelection = e => {
    this.setState({ photo: e.target.files[0] });
  };

  onPhotoUpload = e => {
    e.preventDefault();
    this.props.uploadPhoto(this.props.pendingPieId, this.props.photoRequestUrl, this.state.photo);
  };

  onFormUpdate = e => this.setState({ [e.target.id]: e.target.value });

  renderAddForm = () => {
    return (
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            id="name"
            icon="user"
            iconPosition="left"
            placeholder="Name"
            value={this.state.name}
            onChange={this.onFormUpdate}
          />
          <Button loading={this.props.isSubmitting} fluid color="blue" size="large" onClick={this.onAdd}>
            Add
          </Button>
        </Segment>
      </Form>
    );
  };

  renderPhotoUploadForm = () => {
    return (
      <Form size="large">
        <Segment stacked>
          <input type="file" onChange={this.onPhotoSelection} />
          <Button
            disabled={!this.state.photo}
            loading={this.props.isSubmitting}
            fluid
            color="blue"
            size="large"
            onClick={this.onPhotoUpload}
          >
            Upload
          </Button>
        </Segment>
      </Form>
    );
  };

  render() {
    return (
      <div className="Add">
        <Grid textAlign="center">
          <Grid.Column className="Form">
            <Header as="h2" color="teal" textAlign="center">
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
});

export default connect(mapStateToProps, { addPie, uploadPhoto })(Add);

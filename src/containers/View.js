import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Message, Loader, Card, Rating, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { fetchPie, ratePie, removePie } from '../actions/pie';

import DummyImage from './DummyImage.png';
import './View.css';

class View extends Component {
  static propTypes = {
    fetchPie: PropTypes.func.isRequired,
    ratePie: PropTypes.func.isRequired,
    removePie: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isRating: PropTypes.bool.isRequired,
    isRemoving: PropTypes.bool.isRequired,
    error: PropTypes.string,
    pie: PropTypes.object,
    viewTemplateUrl: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.fetchPie(this.props.viewTemplateUrl, this.props.match.params.id);
  }

  onRating = (e, { rating }) => {
    const { pie } = this.props;
    this.props.ratePie(pie.id, this.props.viewTemplateUrl, pie.rateUrl, rating);
  };

  onRemove = e => {
    this.props.removePie(this.props.pie.removeUrl);
  };

  render() {
    const { isFetching, pie, error } = this.props;

    if (!pie && error) {
      return (
        <div className="View">
          <Message error>{error}</Message>
        </div>
      );
    }

    if (isFetching || !pie) {
      return (
        <div className="View">
          <Loader active inline="centered" />
        </div>
      );
    }

    return (
      <div className="View">
        {error && <Message error>{error}</Message>}
        <Card className="Pie" centered fluid>
          <Image src={pie.photo || DummyImage} />
          <Card.Content>
            <Card.Header content={pie.name} />
            <Card.Description>
              Rated {pie.rating.avg}/5 from {pie.rating.total} reviews
            </Card.Description>
          </Card.Content>
          {(pie.rateUrl || pie.removeUrl) && (
            <Card.Content extra>
              {pie.rateUrl && (
                <Rating disabled={this.props.isRating} size="huge" maxRating={5} onRate={this.onRating} />
              )}
              {pie.removeUrl && (
                <Button negative loading={this.props.isRemoving} floated="right" onClick={this.onRemove}>
                  Remove
                </Button>
              )}
            </Card.Content>
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ view, pies, urls }, ownProps) => ({
  isFetching: view.isFetching,
  isRating: view.isRating,
  isRemoving: view.isRemoving,
  error: view.error,
  pie: pies[ownProps.match.params.id],
  viewTemplateUrl: urls.viewTemplateUrl,
});

export default connect(mapStateToProps, { fetchPie, ratePie, removePie })(View);

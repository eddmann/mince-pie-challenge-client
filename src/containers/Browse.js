import React, { Component } from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import { Loader, Card, Rating, Image, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { fetchPies } from '../actions/pie';

import DummyImage from './DummyImage.png';
import './Browse.css';

class Browse extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    pies: PropTypes.array.isRequired,
    browseUrl: PropTypes.string.isRequired,
    error: PropTypes.string,
  };

  componentDidMount() {
    this.props.dispatch(fetchPies(this.props.browseUrl));
  }

  onViewPie = (e, { id }) => {
    this.props.dispatch(push(`/pies/${id}`));
  };

  render() {
    if (this.props.isFetching) {
      return (
        <div className="Browse">
          <Loader active inline='centered' />
        </div>
      );
    }

    return (
      <div className="Browse">
        {this.props.error && <Message error>{this.props.error}</Message>}
        <Card.Group itemsPerRow={4} doubling>
          {this.props.pies.map(pie =>
            <Card className="Pie" key={pie.id} fluid onClick={this.onViewPie} id={pie.id}>
              <Image src={pie.thumbnail || DummyImage} />
              <Card.Content>
                <Card.Header content={pie.name} />
                <Card.Description>
                  <Rating className="Rating" disabled defaultRating={pie.rating.avg} maxRating={5} />
                </Card.Description>
              </Card.Content>
            </Card>
          )}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = ({ urls, browse, pies }) => ({
  isFetching: browse.isFetching,
  pies: browse.listing.map(id => pies[id]),
  browseUrl: urls.browseUrl,
  error: browse.error,
});

export default connect(mapStateToProps)(Browse);

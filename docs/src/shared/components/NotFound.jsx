import React, { PropTypes, PureComponent } from 'react';
import { withRouter } from 'react-router';

import './_not-found.scss';
import { Card, CardTitle, CardMedia, CardActions } from 'react-md/lib/Cards';
import Button from 'react-md/lib/Buttons';

@withRouter
export default class extends PureComponent {
  static propTypes = {
    router: PropTypes.object.isRequired,
  };

  _navigateHome = () => {
    this.props.router.replace('/');
  };

  render() {
    const overlay = (
      <CardTitle
        key="overlay"
        title="Sorry!"
        subtitle="We could not find that page."
      />
    );

    return (
      <main className="page-404">
        <Card className="not-found-card">
          <CardMedia overlay={overlay}>
            <img src="https://unsplash.it/600/337?image=957" role="presentation" />
          </CardMedia>
          <CardActions>
            <Button primary label="Navigate to Home page" onClick={this._navigateHome} flat>home</Button>
          </CardActions>
        </Card>
      </main>
    );
  }
}

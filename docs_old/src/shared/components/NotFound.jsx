import React, { PropTypes, PureComponent } from 'react';
import { withRouter } from 'react-router';

import './_not-found.scss';
import { Card, CardTitle, CardActions } from 'react-md/lib/Cards';
import Media, { MediaOverlay } from 'react-md/lib/Media';
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
    return (
      <main className="page-404">
        <Card className="not-found-card">
          <Media>
            <MediaOverlay>
              <CardTitle
                key="overlay"
                title="Sorry!"
                subtitle="We could not find that page."
              />
            </MediaOverlay>
            <img src="https://unsplash.it/600/337?image=957" role="presentation" />
          </Media>
          <CardActions>
            <Button primary label="Navigate to Home page" onClick={this._navigateHome} flat>home</Button>
          </CardActions>
        </Card>
      </main>
    );
  }
}

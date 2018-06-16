import React from 'react';
import { Button, Card, CardText } from 'react-md';

import { repoShape } from 'propTypes/github';

const RepoCard = ({
  name,
  html_url: htmlUrl,
  open_issues_count: issues,
  stargazers_count: stargazers,
  language,
  forks_count: forks,
}) => (
  <Card className="md-cell repo-card">
    <CardText>
      <h4>
        <a href={htmlUrl} className="link">
          {name}
        </a>
      </h4>
      <h5 className="md-text--secondary">{language || 'N/A'}</h5>
      <Button flat href={`${htmlUrl}/stargazers`} iconChildren="star">
        {stargazers}
      </Button>
      <Button flat href={`${htmlUrl}/network`} iconClassName="fa fa-code-fork">
        {forks}
      </Button>
      <Button flat href={`${htmlUrl}/issues`} iconChildren="info_outline">
        Issues ({issues})
      </Button>
    </CardText>
  </Card>
);

RepoCard.propTypes = repoShape;

export default RepoCard;

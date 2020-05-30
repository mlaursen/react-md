import React, { useEffect } from 'react';
import { MessageQueue, useAddMessage } from '@react-md/alert';

import Markdown from 'components/Markdown';

import './NewDomain.scss';

const MIGRATION_DATE = new Date(2020, 5, 13);

function getMarkdown() {
  let remaining = '';
  const today = new Date();
  const diff = Math.max(0, MIGRATION_DATE.getTime() - today.getTime());
  const hours = diff / 1000 / 60 / 60;
  const days = Math.floor(hours / 24);
  if (days <= 1) {
    remaining = `**${Math.floor(hours)} hours**`;
  } else {
    remaining = `${days} days`;
  }
  return `
Starting ${MIGRATION_DATE.toLocaleDateString()} _(${remaining})_, this website will be permanently moved to
the new domain and url: https://react-md.dev/v1/
`;
}

const NewDomain = () => {
  const addMessage = useAddMessage();
  useEffect(() => {
    let timeout;
    const enableTimeout = () => {
      timeout = window.setTimeout(() => {
        addMessage({
          stacked: true,
          twoLines: true,
          disableAutohide: true,
          children: <Markdown markdown={getMarkdown()} />,
          action: {
            children: 'Take me there!',
            onClick: () => {
              window.location.href = 'https://react-md.dev/v1/';
            },
          },
        });
      }, 2000);
    };

    window.addEventListener('load', enableTimeout);

    return () => {
      window.removeEventListener('load', enableTimeout);
      window.clearTimeout(timeout);
    };
  }, []);

  return null;
};

export default () => (
  <MessageQueue id="v2-messages" className="new-domain-messages">
    <NewDomain />
  </MessageQueue>
);

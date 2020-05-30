import React, { useEffect } from 'react';
import { MessageQueue, useAddMessage } from '@react-md/alert';

import Markdown from 'components/Markdown';

import './NewDomain.scss';

function getMarkdown() {
  let remaining = '';
  const today = new Date();
  // const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours() + 8);
  const end = new Date(2020, 6, 1);
  const diff = Math.max(0, end.getTime() - today.getTime());
  const hours = diff / 1000 / 60 / 60;
  const days = Math.floor(hours / 24);
  if (days <= 1) {
    remaining = `**${Math.floor(hours)} hours remaining**`;
  } else {
    remaining = `${days} days remaining`;
  }
  return `
Starting July 1, 2020 _(${remaining})_, this website will be permanently moved to
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

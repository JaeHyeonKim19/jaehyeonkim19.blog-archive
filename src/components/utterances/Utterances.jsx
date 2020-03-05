import React, { createRef, useLayoutEffect } from 'react';

const Utterances = React.memo(() => {
  const containerRef = createRef();

  useLayoutEffect(() => {
    const utterances = document.createElement('script');

    const attributes = {
      src: 'https://utteranc.es/client.js',
      repo: 'JaeHyeonKim19/jaehyeonkim19.github.io',
      'issue-term': 'url',
      label: 'Utterances✨',
      theme: 'github-light',
      crossOrigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    containerRef.current.appendChild(utterances);
  }, [containerRef]);

  return <div ref={containerRef} />;
});

Utterances.displayName = 'Utterances';

export default Utterances;

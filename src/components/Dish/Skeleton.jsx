import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 230 470"
    backgroundColor="#787878"
    foregroundColor="#ecebeb">
    <rect x="27" y="347" rx="0" ry="0" width="63" height="15" />
    <rect x="23" y="300" rx="0" ry="0" width="149" height="13" />
    <rect x="52" y="34" rx="0" ry="0" width="0" height="1" />
    <rect x="19" y="-3" rx="0" ry="0" width="164" height="270" />
    <rect x="31" y="403" rx="0" ry="0" width="58" height="36" />
    <rect x="123" y="401" rx="0" ry="0" width="53" height="38" />
  </ContentLoader>
);

export default Skeleton;

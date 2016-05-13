import React from 'react';
import { Meteor } from 'meteor/meteor';

import Header from './header.jsx';

export default Layout= ({content}) => (
  <div className="container-fluid navbar">
      <Header />

      {content}
  </div>

);

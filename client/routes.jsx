import React from 'react';
import {mount} from 'react-mounter';

import Layout from '../imports/ui/app.jsx';
import Home from '../imports/ui/home.jsx';
import Signin from '../imports/ui/signin.jsx';
import Chat from '../imports/ui/chat.jsx';

FlowRouter.route("/",{
  name:'home',
  action(){
    mount(Layout,{
      content:(<Home />)
    });
  }
});

FlowRouter.route("/sign-in",{
  name:'login',
  action(){
    mount(Layout,{
      content:(<Signin />)
    });
  }
});

FlowRouter.route("/chat",{
  name:'chat',
  action(){
    mount(Layout,{
      content:(<Chat />)
    });
  }
});

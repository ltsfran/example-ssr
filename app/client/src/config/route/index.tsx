import React from 'react';
import { App } from '@app/src/views';
import { ViewOne } from '@app/src/views/viewOne';
import { ViewTwo } from '@app/src/views/viewTwo';

interface Props {
  staticContext: any
}

const NotFound: React.FC<Props> = ({ staticContext = {} }) => {
  staticContext.status = 404;
  return <h1>Not Found</h1>;
};

NotFound.displayName = 'NotFound';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/one',
        component: ViewOne,
        exact: true
      },
      {
        path: '/two',
        component: ViewTwo,
        exact: true
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
];

export { routes };
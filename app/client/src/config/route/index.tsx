import React from 'react';
import { App } from '@app/src/views';
import { ViewOne } from '@app/src/views/viewOne';
import { ViewTwo } from '@app/src/views/viewTwo';
import { ViewThree } from '@app/src/views/ViewThree';
import { ViewThreeDescription } from '@app/src/views/ViewThreeDescription';

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
        path: '/three',
        component: ViewThree,
        exact: true
      },
      {
        path: '/three/:id',
        component: ViewThreeDescription,
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
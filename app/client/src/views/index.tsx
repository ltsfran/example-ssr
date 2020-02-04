import React from 'react';
import { renderRoutes } from 'react-router-config';

interface Props {
  route: any;
}

export const App: React.FC<Props> = ({ route }) => (
  <>{renderRoutes(route.routes)}</>
);

App.displayName = 'App';
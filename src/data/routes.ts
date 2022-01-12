export type Route = {
  readonly path: string;
  readonly title: string;
};

export interface Routes {
  readonly Home: Route;
  readonly About: Route;
  readonly Contatti: Route;
}

const routes: Routes = {
  Home: {
    path: '/',
    title: 'Home'
  },
  About: {
    path: '/about/',
    title: 'About'
  },
  Contatti: {
    path: '/contatti/',
    title: 'Contatti'
  }
};

export default routes;

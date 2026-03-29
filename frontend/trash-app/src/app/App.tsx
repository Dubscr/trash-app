import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CurrentUserProvider } from './context/CurrentUserContext';

export default function App() {
  return (
    <CurrentUserProvider>
      <RouterProvider router={router} />
    </CurrentUserProvider>
  );
}

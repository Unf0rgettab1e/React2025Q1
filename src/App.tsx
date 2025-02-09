import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Layout from '~/components/Layout/Layout';
import SuspenseLoader from '~/components/ui/Loader/SuspenseLoader';
import { Details, Main, NotFound } from '~/pages';

export default function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />}>
            <Route path="details/:id" element={<Details />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

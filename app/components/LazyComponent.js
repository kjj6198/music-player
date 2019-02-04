/**
 * LazyComponent
 * use React.lazy, Suspense to Wrap component
 * include error handling and loading component.
 */

import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Lazy({ loader, loading = <div>loading...</div> }) {
  const Component = lazy(loader); // [TODO] add component name

  return props => (
    <ErrorBoundary>
      <Suspense fallback={loading}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

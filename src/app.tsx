import { Suspense } from "preact/compat";

export function App({ promise }: { promise: Promise<string> }) {
  return (
    <Suspense fallback="Loading...">
      <Await promise={promise} />
    </Suspense>
  );
}

function Await({
  promise,
}: {
  promise: Promise<string> & {
    tracked?: boolean;
    value?: string;
    error?: unknown;
  };
}) {
  if ("error" in promise) {
    throw promise.error;
  }
  if ("value" in promise) {
    return <h1>{promise.value}</h1>;
  }
  if (!promise.tracked) {
    promise.tracked = true;
    throw promise.then(
      (value) => {
        promise.value = value;
      },
      (error) => {
        promise.error = error;
      }
    );
  }
  throw promise;
}

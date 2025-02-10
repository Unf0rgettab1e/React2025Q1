export default function SuspenseLoader() {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen flex items-center justify-center">
      <img src="/favicon.svg" alt="Loading..." className="w-16 h-16 animate-spin"></img>
    </div>
  );
}

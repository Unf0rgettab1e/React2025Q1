export default function Loader() {
  return (
    <div data-testid="loader" className="flex flex-1 items-center justify-center">
      <img src="/favicon.svg" alt="loader" className="w-10 h-10 animate-spin"></img>
    </div>
  );
}

interface Props {
  errorMessage: string;
}

export default function ErrorResponse({ errorMessage }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center my-30 text-center">
      <h2 className="text-2xl font-bold text-orange-500">{`Error: ${errorMessage}`}</h2>
      <p className="text-gray-600">Try again another time...</p>
    </div>
  );
}

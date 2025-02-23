interface AnimePosterProps {
  imageUrl: string;
  title: string;
}

const AnimePoster = ({ imageUrl, title }: AnimePosterProps) => {
  return (
    <div className="z-20 flex-shrink-0">
      <img src={imageUrl} alt={title} className="z-10 w-40 h-auto rounded-lg shadow sm:w-64 -rotate-6" />
    </div>
  );
};

export default AnimePoster;

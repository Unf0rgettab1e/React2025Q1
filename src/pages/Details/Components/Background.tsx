interface AnimeBackgroundProps {
  imageUrl: string;
}

const AnimeBackground = ({ imageUrl }: AnimeBackgroundProps) => {
  return (
    <>
      <div className="absolute inset-0">
        <img src={imageUrl} alt="Cover" className="object-cover object-center w-full h-full md:object-top" />
      </div>
      <div className="absolute inset-0 bg-slate-800 opacity-60 backdrop-blur-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-transparent to-slate-600 opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-600 via-transparent to-transparent opacity-70"></div>
    </>
  );
};

export default AnimeBackground;

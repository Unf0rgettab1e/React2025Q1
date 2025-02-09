import { useLocation, useNavigate } from 'react-router';

const AnimeDetails = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  return <div className="text-white flex-1 sticky top-24 h-max" onClick={() => navigate(`/${location.search}`)}></div>;
};

export default AnimeDetails;

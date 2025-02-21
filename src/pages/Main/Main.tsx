import { FC } from 'react';
import { Outlet } from 'react-router';
import AnimeList from '../../components/AnimeList/AnimeList';
import ErrorButton from '../../components/Errors/ErrorBoundary/ErrorButton/ErrorButton';

const Main: FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center h-full">
      <div className="flex justify-center w-full p-4 gap-x-4 md:gap-x-8">
        <AnimeList />
        <Outlet />
      </div>
      <ErrorButton />
    </div>
  );
};

export default Main;

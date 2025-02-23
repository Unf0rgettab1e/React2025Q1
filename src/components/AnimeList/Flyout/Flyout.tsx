import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/ui/Button/Button';
import { clearSelections } from '~/store/animeDownloadSlice';
import { AppDispatch, RootState } from '~/store/store';
import useCsvDownloadUrl from './useCsvDownloadUrl';

const Flyout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector((state: RootState) => state.animeDownload.selectedItems);
  const downloadUrl = useCsvDownloadUrl(selectedItems);

  if (selectedItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 z-100 right-0 bg-slate-800 text-slate-100 font-bold p-4 flex justify-around items-center flex-wrap">
      <span className="text-lg">
        <b className="text-rose-200 text-xl">{selectedItems.length}</b> items are selected
      </span>
      <div className="flex gap-4">
        <Button className="bg-rose-700" onClick={() => dispatch(clearSelections())}>
          Unselect all
        </Button>
        <a
          href={downloadUrl || '#'}
          download={`${selectedItems.length}_anime.csv`}
          className="btn bg-slate-700 text-slate-300"
          onClick={e => !downloadUrl && e.preventDefault()}
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default Flyout;

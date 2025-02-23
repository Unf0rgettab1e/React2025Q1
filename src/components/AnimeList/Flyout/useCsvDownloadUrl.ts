import { useEffect, useState } from 'react';
import { Anime } from '~/types/animeApi';

const useCsvDownloadUrl = (items: Anime[]) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const headers = ['ID', 'Title', 'URL', 'Synopsis'].join(',');
    const rows = items.map(({ mal_id, title_english, url, synopsis }) =>
      [mal_id, `"${title_english}"`, url, `"${synopsis?.replace(/"/g, '""') || 'No description...'}"`].join(',')
    );

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const newUrl = URL.createObjectURL(blob);
    setUrl(newUrl);

    return () => {
      URL.revokeObjectURL(newUrl);
    };
  }, [items]);

  return url;
};

export default useCsvDownloadUrl;

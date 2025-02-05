const API_URL = 'https://api.jikan.moe/v4/';

type TFetcherOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  header?: Record<string, string>;
  body?: string;
};

type TResponse<T> = {
  data?: T;
  status: number;
  error?: string;
};

export async function fetcher<T>({ method, endpoint, header, body }: TFetcherOptions): Promise<TResponse<T>> {
  const headers: { [key: string]: string } = header || { 'Content-Type': 'application/json' };
  const result: TResponse<T> = { status: 0 };

  return fetch(`${API_URL}${endpoint}`, { method, headers, body })
    .then(response => {
      result.status = response.status;
      if (!response.ok) {
        result.error = response.statusText;
      }
      return response.json();
    })
    .then(data => {
      result.data = data;
      return result;
    })
    .catch(error => {
      let message = error instanceof Error ? error.message : 'Unknown error';
      if (message === 'Failed to fetch') message = 'No Internet connection!';
      result.error = message;

      return result;
    });
}

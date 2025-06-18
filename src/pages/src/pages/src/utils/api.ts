export const apiFetch = async <T = any>(
  url: string,
  options: RequestInit = {},
  token?: string
): Promise<T> => {
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Content-Type": "application/json",
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

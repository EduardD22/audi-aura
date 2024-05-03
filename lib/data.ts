export async function fetchTopArtist(accessToken: string) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=1",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top artist");
  }

  const data = await response.json();
  return data.items[0].name;
}

export async function fetchTopTrack(accessToken: string) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=1",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top track");
  }

  const data = await response.json();
  return data.items[0].name;
}

export async function fetchTopGenre(accessToken: string) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=10",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top genre");
  }

  const data = await response.json();
  const genres = data.items.flatMap((artist: any) => artist.genres);
  const topGenre = getMostFrequentGenre(genres);
  return topGenre;
}

function getMostFrequentGenre(genres: string[]) {
  const genreCount: Record<string, number> = {};

  for (const genre of genres) {
    genreCount[genre] = (genreCount[genre] || 0) + 1;
  }

  return Object.keys(genreCount).reduce((a, b) =>
    genreCount[a] > genreCount[b] ? a : b
  );
}

export async function fetchTotalTracks(accessToken: string) {
  const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=1", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch total tracks");
  }

  const data = await response.json();
  return data.total;
}

export async function fetchRecentlyPlayed(accessToken: string) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=5",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recently played tracks");
  }

  const data = await response.json();
  return data.items;
}

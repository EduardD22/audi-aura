// top artist home

export async function fetchTopArtist(accessToken: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=1`,
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
// top track home
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
// top genre home
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

// total tracks home
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

// recently played home

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

// bubble chart home

export async function fetchTopTracks(
  accessToken: string,
  timeRange: string = "medium_term",
  limit: number = 50
) {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top tracks");
  }

  const data = await response.json();
  return data.items;
}

export async function fetchAudioFeatures(
  accessToken: string,
  trackIds: string[]
) {
  const response = await fetch(
    `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(",")}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch audio features");
  }

  const data = await response.json();
  return data.audio_features;
}

export async function getBubbleChartData(accessToken: string) {
  const topTracks = await fetchTopTracks(accessToken);
  const trackIds = topTracks.map((track: any) => track.id);
  const audioFeatures = await fetchAudioFeatures(accessToken, trackIds);

  const bubbleChartData = audioFeatures.map((feature: any, index: number) => ({
    id: trackIds[index],
    title: topTracks[index].name,
    artist: topTracks[index].artists[0].name,
    energy: feature.energy,
    valence: feature.valence,
    popularity: topTracks[index].popularity,
  }));

  return bubbleChartData;
}

// Top artists Radar Chart

export async function fetchTopArtists(accessToken: string, limit: number = 4) {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=${limit}`,
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
  return data.items;
}

export async function fetchArtistTopTracksAudioFeatures(
  accessToken: string,
  artistId: string
) {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch artist top tracks");
  }

  const data = await response.json();
  // get track IDs from the top tracks
  const trackIds = data.tracks.map((track: any) => track.id);
  // fetch audio features for the top tracks based on their IDs
  const audioFeatures = await fetchAudioFeatures(accessToken, trackIds);
  return audioFeatures;
}

export async function getRadarChartData(accessToken: string) {
  // fetching top artists
  const topArtists = await fetchTopArtists(accessToken);
  // get the IDs of the top artists
  const artistIds = topArtists.map((artist: any) => artist.id);
  // array of promises to fetch audio features for the top tracks of each artist
  const audioFeaturesPromises = artistIds.map((artistId: string) =>
    fetchArtistTopTracksAudioFeatures(accessToken, artistId)
  );
  // resolve all promises
  const audioFeaturesResults = await Promise.all(audioFeaturesPromises);

  // create object to store artist data
  const artistData: Record<
    string,
    { popularity: number; danceability: number; energy: number }
  > = {};
  // iterate over the top artists and calculate the average audio features
  topArtists.forEach((artist: any, index: number) => {
    const audioFeatures = audioFeaturesResults[index];
    const averageDanceability =
      audioFeatures.reduce(
        (sum: number, feature: any) => sum + feature.danceability,
        0
      ) / audioFeatures.length;
    const averageEnergy =
      audioFeatures.reduce(
        (sum: number, feature: any) => sum + feature.energy,
        0
      ) / audioFeatures.length;
    // store the artist data in the object
    artistData[artist.name] = {
      popularity: artist.popularity / 100, // normalize popularity to be between 0 and 1
      danceability: averageDanceability,
      energy: averageEnergy,
    };
  });
  // create radar chart data
  const radarChartData = [
    {
      metric: "Popularity",

      ...Object.fromEntries(
        topArtists.map((artist: any) => [
          artist.name,
          artistData[artist.name].popularity,
        ])
      ),
    },
    {
      metric: "Danceability",
      ...Object.fromEntries(
        topArtists.map((artist: any) => [
          artist.name,
          artistData[artist.name].danceability,
        ])
      ),
    },
    {
      metric: "Energy",
      ...Object.fromEntries(
        topArtists.map((artist: any) => [
          artist.name,
          artistData[artist.name].energy,
        ])
      ),
    },
  ];

  return radarChartData;
}

// Top Genres Pie Chart
export async function fetchTopGenres(accessToken: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top genres");
  }

  const data = await response.json();
  const genres = data.items.flatMap((artist: any) => artist.genres);
  const genreCounts = genres.reduce((acc: any, genre: string) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  const sortedGenres = Object.entries(genreCounts)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, value]: any) => ({ name, value }));

  return sortedGenres;
}

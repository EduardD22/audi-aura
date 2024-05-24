"use server";

// Fetch the user's profile
async function fetchUserProfile(accessToken: string) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch user profile ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}

// Create a new playlist
async function createPlaylist(
  accessToken: string,
  userId: string,
  name: string,
  description: string
) {
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name,
        description,
        public: false,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to create playlist ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}

// Add tracks to the playlist
async function addTracksToPlaylist(
  accessToken: string,
  playlistId: string,
  tracksUri: string[]
) {
  await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ uris: tracksUri }),
  });
}

// Main function to handle playlist creation
export async function createRecommendedPlaylist(formData: FormData) {
  try {
    const accessToken = formData.get("accessToken") as string;
    const recommendedTracks = JSON.parse(
      formData.get("recommendedTracks") as string
    );
    const tracksUri = recommendedTracks.map((track: any) => track.track.uri);

    const userProfile = await fetchUserProfile(accessToken);
    const userId = userProfile.id;

    const playlist = await createPlaylist(
      accessToken,
      userId,
      "My Recommendation Playlist",
      "Playlist created by AudiAura"
    );

    await addTracksToPlaylist(accessToken, playlist.id, tracksUri);

    return playlist;
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw new Error("Failed to create playlist. Please try again.");
  }
}

/*
// add recommended tracks to user's playlists

export async function addTracksToPlaylist(formData: FormData) {
  const accessToken = formData.get("accessToken") as string;
  const recommendedTracks = JSON.parse(
    formData.get("recommendedTracks") as string
  );

  console.log(recommendedTracks);

  const tracksUri = recommendedTracks.map((track: any) => track.track.uri);
  console.log(tracksUri);

  // Fetch the user's profile to get the user ID
  const userProfileResponse = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!userProfileResponse.ok) {
    throw new Error(
      `Failed to fetch user profile ${userProfileResponse.status} ${userProfileResponse.statusText}`
    );
  }

  const userProfile = await userProfileResponse.json();
  const userId = userProfile.id;

  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: "My Recommendation Playlist",
        description: "Playlist created by AudiAura",
        public: false,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to create playlist ${response.status} ${response.statusText}`
    );
  }

  const playlist = await response.json();

  await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ uris: tracksUri }),
  });

  return playlist;
}*/

export default async function Page() {
  const playlistId = "0BacU7V8NzeNHv61n5iViw";
  return (
    <div>
      <iframe
        title="Spotify Embed: Recommendation Playlist "
        src={`https://open.spotify.com/embed/playlist/0BacU7V8NzeNHv61n5iViw?utm_source=generator&theme=0`}
        width="100%"
        height="100%"
        style={{ minHeight: "360px" }}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

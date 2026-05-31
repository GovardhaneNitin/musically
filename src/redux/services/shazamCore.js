import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Maps app genre codes to iTunes search terms
const GENRE_MAP = {
  POP: "pop music",
  HIP_HOP_RAP: "hip hop rap",
  DANCE: "dance music",
  ELECTRONIC: "electronic music",
  SOUL_RNB: "soul rnb",
  ALTERNATIVE: "alternative rock",
  ROCK: "rock music",
  LATIN: "latin music",
  FILM_TV: "film soundtrack",
  COUNTRY: "country music",
  WORLDWIDE: "world music",
  REGGAE_DANCE_HALL: "reggae music",
  HOUSE: "house music",
  K_POP: "k-pop",
};

// Normalizes an iTunes track result into the shape the app expects
const normalizeTrack = (t) => {
  const artwork = t.artworkUrl100
    ? t.artworkUrl100.replace("100x100bb", "400x400bb")
    : "";
  return {
  key: String(t.trackId),
  title: t.trackName,
  subtitle: t.artistName,
  collectionName: t.collectionName || "",
  images: {
    coverart: artwork,
    background: artwork, // used by TopPlay artist Swiper
  },
  artists: [{ adamid: String(t.artistId || 0) }],
  // hub.actions[1].uri is where Player.jsx reads the audio URL from
  hub: { actions: [null, { uri: t.previewUrl || "" }] },
  genres: { primary: t.primaryGenreName || "" },
  sections: [{ type: "SONG" }, { type: "NO_LYRICS", text: [] }],
  };
};

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://itunes.apple.com" }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/search?term=top+hits+2024&media=music&limit=25&country=US",
      transformResponse: (res) =>
        res.results
          ?.filter((r) => r.wrapperType === "track")
          .map(normalizeTrack) || [],
    }),

    getSongsByGenre: builder.query({
      query: (genre) => {
        const term = GENRE_MAP[genre] || "pop music";
        return `/search?term=${encodeURIComponent(term)}&media=music&limit=25`;
      },
      transformResponse: (res) =>
        res.results
          ?.filter((r) => r.wrapperType === "track")
          .map(normalizeTrack) || [],
    }),

    getSongsByCountry: builder.query({
      query: (countryCode) =>
        `/search?term=top+hits&media=music&limit=25&country=${countryCode || "US"}`,
      transformResponse: (res) =>
        res.results
          ?.filter((r) => r.wrapperType === "track")
          .map(normalizeTrack) || [],
    }),

    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/search?term=${encodeURIComponent(searchTerm)}&media=music&limit=25`,
      transformResponse: (res) => ({
        tracks: {
          hits:
            res.results
              ?.filter((r) => r.wrapperType === "track")
              .map((t) => ({ track: normalizeTrack(t) })) || [],
        },
      }),
    }),

    getSongDetails: builder.query({
      query: ({ songid }) => `/lookup?id=${songid}`,
      transformResponse: (res) => {
        const t = res.results?.find((r) => r.wrapperType === "track");
        return t ? normalizeTrack(t) : null;
      },
    }),

    // Fetches the same artist's other songs as "related" tracks
    getSongRelated: builder.query({
      queryFn: async ({ songid }, _api, _extraOptions, baseQuery) => {
        const trackRes = await baseQuery(`/lookup?id=${songid}`);
        if (trackRes.error) return { error: trackRes.error };

        const track = trackRes.data?.results?.find(
          (r) => r.wrapperType === "track"
        );
        if (!track) return { data: [] };

        const artistRes = await baseQuery(
          `/lookup?id=${track.artistId}&entity=song&limit=10`
        );
        if (artistRes.error) return { data: [normalizeTrack(track)] };

        const songs =
          artistRes.data?.results?.filter((r) => r.wrapperType === "track") ||
          [];
        return { data: songs.map(normalizeTrack) };
      },
    }),
  }),
});

export const ShazamCoreApiV2 = createApi({
  reducerPath: "shazamCoreApiV2",
  baseQuery: fetchBaseQuery({ baseUrl: "https://itunes.apple.com" }),
  endpoints: (builder) => ({
    getArtistDetails: builder.query({
      query: (artistId) => `/lookup?id=${artistId}&entity=song&limit=10`,
      transformResponse: (res) => {
        const artist = res.results?.find((r) => r.wrapperType === "artist");
        const songs =
          res.results?.filter((r) => r.wrapperType === "track") || [];
        const coverart =
          songs[0]?.artworkUrl100?.replace("100x100bb", "400x400bb") || "";
        return {
          attributes: {
            name: artist?.artistName || "",
            genreNames: [artist?.primaryGenreName || ""],
            // Plain URL — DetailsHeader's .replace("{w}","500") calls are no-ops
            artwork: { url: coverart },
          },
          songs: songs.map(normalizeTrack),
        };
      },
    }),
  }),
});

export const { useGetArtistDetailsQuery } = ShazamCoreApiV2;

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;

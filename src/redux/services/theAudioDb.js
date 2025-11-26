import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = "2";

export const theAudioDbApi = createApi({
  reducerPath: "theAudioDbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://www.theaudiodb.com/api/v1/json/${apiKey}`,
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/search.php?s=coldplay",
    }),
    getSongsByCountry: builder.query({
      query: (country) => "/search.php?s=drake",
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/searchtrack.php?s=${searchTerm}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artist.php?i=${artistId}`,
    }),
    getSongDetails: builder.query({
      query: (songId) => `/track.php?h=${songId}`,
    }),
    getSongRelated: builder.query({
      query: (songId) => `/track.php?h=${songId}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = theAudioDbApi;

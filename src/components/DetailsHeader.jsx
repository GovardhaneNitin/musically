import React from "react";
import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.artists?.[0];

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-[#18122B] sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        <img
          alt="profile"
          src={
            artistId
              ? artist.strArtistThumb
              : songData?.strTrackThumb
          }
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-[#0F0F0F]"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artist.strArtist : songData?.strTrack}
          </p>
          {!artistId && (
            <Link to={`/artists/${songData?.idArtist}`}>
              <p className="text-base text-gray-200 mt-2">{songData?.strArtist}</p>
            </Link>
          )}

          <p className="text-base text-gray-200 mt-2">
            {artistId
              ? artist.strGenre
              : songData?.strGenre}
          </p>
        </div>
      </div>

      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;

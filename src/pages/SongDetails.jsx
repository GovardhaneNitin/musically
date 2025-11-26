import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/theAudioDb";

const SongDetails = () => {
  const { songid } = useParams();
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songid);

  if (isFetchingSongDetails) return <Loader title="Searching song details" />;

  return (
    <div className="flex flex-col">
      <DetailsHeader songData={songData?.track[0]} />
    </div>
  );
};

export default SongDetails;

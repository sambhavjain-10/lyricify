import { useArtist } from "@data-access";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Artist.module.scss";

const Artist = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [songs, setSongs] = useState([]);

	const { artistData, artistSongs, artistLoading, artistSongsLoading, artistError, artistSongsError } = useArtist(id);

	useEffect(() => {
		if (artistSongs) setSongs(artistSongs);
	}, [artistSongs]);

	return (
		<div className={styles.container}>
			<button onClick={() => navigate(-1)}>{"<"} back</button>
			<div className={styles.artist}>
				<img src={artistData?.image_url} />
				<div>
					<span>{artistData?.name}</span>
				</div>
			</div>
			<div className={styles.tracks}>
				<span>Songs</span>
				<div>
					{songs?.map(track => (
						<div className={styles.track} onClick={() => navigate(`/song/${track.id}`)}>
							<img src={track.song_art_image_thumbnail_url} alt="" />
							<div>
								<span>{track.title}</span>
								<p>{track.release_date_for_display}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Artist;

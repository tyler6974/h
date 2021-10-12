import React, { useEffect } from "react";
import FrameStats from "./FrameStats";

export default function GameManager(): JSX.Element {
	useEffect(function() {
		$(document).on("keypress", function (event) {
			if (event.shiftKey) return;
			const search = $(".search")
				.children(".photon-input")
				.children("input");
			if (search.is(":focus")) return;
			if (event.key !== "f") return;
			$("#game-renderer")[0].requestFullscreen();
		});
	});

	return (
		<div className="game-manager">
			<p className="frame-counter mono">FPS: <FrameStats/></p>
			<p className="link mono" style={{
				float: "right",
				color: "var(--palette_primary_light)",
				fontWeight: 500,
				cursor: "pointer",
				userSelect: "none"
			}}
			onClick={ () => $("#game-renderer")[0].requestFullscreen() }>Fullscreen</p>
		</div>
	);
}

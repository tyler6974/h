import Adsense from "components/Adsense";
import GameManager from "components/GameManager";
import GameNotFound from "components/GameNotFound";
import GameRenderer from "components/GameRenderer";
import { Col, Container, Row } from "photoncss/lib/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGameFromID } from "../src/gameHash";

export const route = "/g/:gameid/:slug";

export default function View(): JSX.Element {

	const { gameid } = useParams<Record<string, string>>();
	const game = getGameFromID(gameid);

	if (game === undefined) return <GameNotFound/>;

	const { width = 800 } = game;

	useEffect(function() {
		setTimeout(function() {
			document.title = `${game.name} • ${APP_MANIFEST.name}`;
		});
	});

	return (
		<Container style={{ maxWidth: width + 280 }}>
			<br/>
			<Row>

				<Col xl={10}>

					<div className="title" style={{ width, float: "right", maxWidth: "100%" }}>
						<h3>{ game.name }</h3>
					</div>
				</Col>
				<Col xl={2}></Col>

				<Col xl={10}>
					<div style={{ maxWidth: width, marginLeft: "auto" }} id="game-player">
						<div style={{ margin: 8 }}>
							<GameRenderer game={game}/>
							<GameManager/>
						</div>
					</div>
				</Col>
				<Col xl={2}>
					<Adsense
						style={{ display: "block", textAlign: "center", minWidth: 250, height: "100%" }}
						adLayout="in-article"
						adFormat="fluid"
						fullWidthResponsive="false"/>
				</Col>

			</Row>
		</Container>
	);
}

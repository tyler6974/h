import { Col, Container, Footer, FooterCopyright, Row } from "photoncss/lib/react";
import React, { useEffect, useState } from "react";
import DiscordInvite from "react-discord-invite";
import { Link } from "react-router-dom";
import { client } from "../runtime/util/offlineInstaller";

export function MoTD(): JSX.Element | null {

	type State = { motd: string } | null;

	// Initialize state
	const [ state, setState ] = useState<State>(null);

	// Have state sync with server every second while component is mounted
	useEffect(function() {
		if (state === null) fetch("https://joshm.us.to/api/v1/motd").then(resp => resp.json())
			.then(setState);
	});

	// If loading
	if (state === null) return null;

	// Return motd
	return <p>{state!.motd}</p>;

}

export default function Component(): JSX.Element {
	return (
		<Footer className="theme--dark">
			<Container>
				<Row>
					<Col xl={4}>
						<Link to={`/${location.search}`}>
							<div className="title">
								<h3>{ APP_MANIFEST.name }</h3>
							</div>
						</Link>
						<MoTD/>
					</Col>
					<Col xl={4}>
						<a href="//github.com/SHSGames/shsgames.github.io" style={{ marginTop: 16, display: "inline-block", maxWidth: "calc(100vw - 32px)", overflow: "hidden" }}>
							<img src={"https://github-readme-stats.vercel.app/api/pin/?username=SHSGames&repo=shsgames.github.io&theme=radical&bg_color=22272e&border_color=373e47&title_color=58a6ff&icon_color=adbac7&text_color=adbac7"} alt="" className="raised-3"/>
						</a>
					</Col>
					<Col xl={4}>
						<div className="raised-3" style={{ display: "inline-block", margin: "16px 0", maxWidth: "calc(100vw - 32px)", overflow: "hidden" }}>
							<DiscordInvite guild="584437072618717209"/>
						</div>
					</Col>
				</Row>
			</Container>
			<FooterCopyright>
				<div style={{ paddingLeft: 8 }}>
					<div style={{ display: "inline-flex", alignItems: "start", flexDirection: "column" }}>
						<span>Copyright © 2019-{(new Date).getFullYear()} • All Rights Reserved</span>
						<div>
							<a href="//joshmerlino.github.io" className="link">Josh Merlino</a> • <a href="//th3skeleton.github.io/pshel/" className="link">Parker Sheldon</a>
						</div>
					</div>
					<div style={{ alignItems: "start", flexDirection: "column", marginLeft: "auto", display: "table", marginTop: "-26px", transform: "translateY(-4px)" }}>
						<code>v{APP_MANIFEST.version}-{parseInt(client.substr(0, 8), 16) % 255}</code>
					</div>
				</div>
			</FooterCopyright>
		</Footer>
	);
}

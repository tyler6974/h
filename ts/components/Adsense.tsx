/* eslint no-extra-parens: off */
import { guid } from "photoncss/lib";
import { Card } from "photoncss/lib/react";
import React, { CSSProperties, useEffect, useState } from "react";
import app from "../src/app";

export type Props = {
	adLayout: "in-article";
	style: CSSProperties;
	adFormat: "fluid";
	fullWidthResponsive: "true" | "false";
}
export default function Adsense({ adLayout = "in-article", style, adFormat = "fluid", fullWidthResponsive = "true" }: Props): JSX.Element {

	const [ state, setState ] = useState(true);
	const id = guid();

	useEffect(function() {
		try {
			(adsbygoogle = (window as any).adsbygoogle || []).push({});
		} catch (e) {
			setState(false);
		}

	}, []);

	useEffect(function() {
		if (state !== false) return;
		setImmediate(function() {
			function resize() {
				if ($("#" + id)[0].clientWidth > 600) return $("#" + id).addClass("horizontal");
				$("#" + id).removeClass("horizontal");
			}

			$(window)
				.on("resize", resize)
				.trigger("resize");
		});
	});

	if (state === false) {
		return (
			<Card variant="outlined" className="flex-adaptive" style={{ ...style, overflow: "hidden", padding: 24, display: "flex" }} id={id}>
				<img src={ app.static("adblocker.svg") } alt="" style={{ maxWidth: 200, display: "inline-flex" }}/>
				<div style={{ width: "-webkit-fill-available", maxWidth: 390 }}>
					<h1 style={{ display: "block", textAlign: "center" }}>Hey!</h1>
					<p>We see your using an ad-blocker... { APP_MANIFEST.name } isn't free on our end and certianly isn't cheap to run and maintain. We use those ads to support future development and keep { APP_MANIFEST.name } free for everyone. It would mean a lot to us if we got added to your ad-blocker whitelist. 💕</p>
				</div>
			</Card>
		);
	}

	return (
		<Card variant="outlined" style={{ overflow: "hidden" }}>
			<ins className="adsbygoogle"
				style={style}
				data-ad-client="ca-pub-6128732932572955"
				data-ad-slot="1159034500"
				data-ad-layout={adLayout}
				data-ad-format={adFormat}
				data-full-width-responsive={fullWidthResponsive}></ins>
		</Card>
	);
}

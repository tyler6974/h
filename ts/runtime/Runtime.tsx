import app from "src/app";
import React, { useEffect } from "react";
import { ThemeProvider } from "photoncss/lib/react";
import { Route, Switch } from "react-router-dom";
import Router from "./Router";
import Footer from "components/Footer";
import Toolbar from "components/Toolbar";
import Drawer from "components/Drawer";
import Keybinds from "./Keybinds";
import GameNotFound from "components/GameNotFound";
import PWAInstaller from "pwa-installer-react";

type Props = { views: View[] };
export default function Runtime({ views }: Props): JSX.Element {

	// On mount
	useEffect(function() {

		// Initialize route
		let route = "";
		(function loop(): void {

			// Run again on next fraome
			requestAnimationFrame(loop);

			// If route/page was changed
			if (route !== app.getRoute()) {

				// Change route cache
				route = app.getRoute();

				// Reset scroll
				$(window).scrollTop(0);

				// Get view
				const _views = views.filter(({ route }) => new RegExp(route.replace(/:\w.*/g, "\\w.*"), "g").test(app.getRoute()));
				const view = _views.length > 1 ? _views[_views[0].route === "/" ? 1:0] : _views[0];

				// Get title from route
				const title = view?.title !== undefined ? `${view.title} • ${APP_MANIFEST.name}` : APP_MANIFEST.name;

				// Set new title
				document.title = title;

			}
		}());
	});

	// Render router
	return (
		<ThemeProvider global>
			<Router>
				<main>
					<Toolbar/>
					<Drawer/>
					<Switch>
						{ views.map(({ route, default: view }, key) =>
							<Route
								key={key}
								path={route}
								exact={true}
								component={view as unknown as React.ComponentType}/>
						) }
						<Route component={GameNotFound} />
					</Switch>
				</main>
				<Footer/>
				<PWAInstaller/>
				<Keybinds/>
			</Router>
		</ThemeProvider>
	);

}

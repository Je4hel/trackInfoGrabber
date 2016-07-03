import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";
import {TrackService} from "./services/track.service";
import {SearchComponent} from "./components/search/search.component";
import {TrackDetailComponent} from "./components/track-detail/track-detail.component";

@Component({
    selector: "tig-app",
    templateUrl: "app/app.component.html",
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, TrackService],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: "/search", name: "Search", component: SearchComponent, useAsDefault: true},
    {path: "/detail/:id", name: "TrackDetail", component: TrackDetailComponent}
])
export class AppComponent{
    appTitle: string = "Track Info Grabber"
}

export class Constants {
    static searchResultStorageKey = "searchResult";
    static searchQueryStorageKey = "searchQuery";

    static defaultAlbumArtworkPath = "app/assets/default-albumart.png";
}
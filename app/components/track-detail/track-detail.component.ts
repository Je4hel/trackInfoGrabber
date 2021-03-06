import {Component, OnInit} from "angular2/core";
import {RouteParams, Router, ROUTER_DIRECTIVES} from "angular2/router";
import {TrackService} from "../../services/track.service";
import {Track} from "../../models/track";
import {Constants} from "../../app.component";

@Component({
    templateUrl: "app/components/track-detail/track-detail.component.html",
    styleUrls: ["app/components/track-detail/track-detail.component.css",
                "app/shared/animations.css"],
    directives: [ROUTER_DIRECTIVES]
})
export class TrackDetailComponent implements OnInit {
    private _trackId: string = null;
    pageName: string = "Detail: ";
    track: Track = null;
    previewAudio: any = null; // The Audio object is not yet defined in TypeScript
    loadingTrack: boolean = true;
    albumArtworkLoaded: boolean = false;
    errorMessage: string = null;

    constructor(private _routeParams: RouteParams, private _router: Router, private _trackService: TrackService) {
        this._trackId = this._routeParams.get("id"); 
    }

    ngOnInit(): void {
        this.loadingTrack = true;
        this._trackService.getTrack(this._trackId)
            .subscribe(track => {
                this.track = track;
                this.previewAudio = new Audio(track.preview_url);
                this.previewAudio.onended = () => this.previewAudio.pause();
                this.loadingTrack = false;
                console.info(track);
            },
            error => this.errorMessage = <any>error);
    }

    playPausePreview(): void {
        if (this.previewAudio.paused || this.previewAudio.ended) {
            this.previewAudio.load();
            this.previewAudio.play();
        }
        else {
            this.previewAudio.pause();
        }
    }

    getArtistsString(): string {
        if (this.track.artists.length == 1) {
            return this.track.artists[0].name;
        }
        else {
            let artists: string = "";
            this.track.artists.forEach((artist, idx) => artists += idx < this.track.artists.length - 1 ? artist.name + ", " : "and " + artist.name);

            return artists;
        }
    }
}
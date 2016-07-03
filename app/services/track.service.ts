import {Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";
import {Observable} from "rxjs/Rx";
import {Track} from "../models/track";
import {TrackSearchResult} from "../models/trackSearchResult";

@Injectable()
export class TrackService {
    private _spotifySearchTrackUrl: string = "https://api.spotify.com/v1/search?q=track:__TRACK__&type=track";
    private _spotifyGetTrackUrl: string = "https://api.spotify.com/v1/tracks/__TRACK_ID__";

    constructor (private _http: Http) {}

    /** Gets tracks information based on the specified trackId */
    getTrack(trackId: string): Observable<Track> {
        return this._http.get(this._spotifyGetTrackUrl.replace("__TRACK_ID__", trackId))
            .map((response: Response) => new Track(response.json()))
            .catch(this.handleError);
    }

    /** Calls the Spotify API to search the specified query as a track */
    searchTrack(query: string): Observable<TrackSearchResult> {
        return this.loadSearch(this._spotifySearchTrackUrl.replace("__TRACK__", query));
    }

    /** Calls the Spotify API to retrieve the page of results corresponding to the specified URL */
    getPage(pageUrl: string): Observable<TrackSearchResult> {
        return this.loadSearch(pageUrl);
    }

    /** Calls the specified url over HTTP GET and creates a new <<TrackSearchResult>> object with the response data */
    private loadSearch(url: string): Observable<TrackSearchResult> {
        return this._http.get(url)
            .map((response: Response) => new TrackSearchResult(response.json().tracks))
            .catch(this.handleError);
    }

    /** Handles HTTP errors */
    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}
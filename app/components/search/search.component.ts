import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Constants} from "../../app.component";
import {TrackService} from "../../services/track.service";
import {TrackSearchResult} from "../../models/trackSearchResult";
import {Track} from "../../models/track";

@Component({
    templateUrl: "app/components/search/search.component.html",
    styleUrls: ["app/components/search/search.component.css",
                "app/shared/animations.css"],
    directives: [ROUTER_DIRECTIVES]
})
export class SearchComponent {
    private _appendResult = false;
    searchQuery: string;
    loadingResult: boolean = false;
    errorMessage: string = null;
    result: TrackSearchResult;
    albumArtworkWidth: number = 250;

    constructor(private _trackService: TrackService) {
        let previousQuery: string = window.sessionStorage.getItem(Constants.searchQueryStorageKey);
        let previousResult: string = window.sessionStorage.getItem(Constants.searchResultStorageKey);
        
        if (previousQuery != null) {
            this.searchQuery = previousQuery;
        }

        if (previousResult != null) {
            this.result = JSON.parse(previousResult);
        }
    }

    searchClicked(): void {
        this.result = null;
        this.loadingResult = true;
        console.info("Search for track: " + this.searchQuery);
        this._trackService.searchTrack(this.searchQuery)
            .subscribe(
                searchResult => {
                    this._appendResult = false;
                    this.processSearchResult(searchResult);
                },
                error => this.errorMessage = <any>error
            );
    }

    loadNextResult(): void {
        if (this.result.next != null)
        {
            this.loadingResult = true;
            console.log("Loading next results from " + this.result.next);
            this._trackService.getPage(this.result.next)
                .subscribe(
                    searchResult => {
                        this._appendResult = true;
                        this.processSearchResult(searchResult);
                    },
                    error => this.errorMessage = <any>error
                );
        }
    }

    private processSearchResult(result: TrackSearchResult): void {
        if (!this._appendResult) {
            this.result = result;
        }
        else
        {
            this.result.href = result.href;
            this.result.offset = result.offset;
            this.result.limit = result.limit;
            this.result.previous = result.previous;
            this.result.next = result.next;
            this.result.items.push.apply(this.result.items, result.items);
        }
        
        this.errorMessage = null;
        this.loadingResult = false;

        // Add the search result to Session Storage
        window.sessionStorage.setItem(Constants.searchQueryStorageKey, this.searchQuery);
        window.sessionStorage.setItem(Constants.searchResultStorageKey, JSON.stringify(this.result));
    }
}
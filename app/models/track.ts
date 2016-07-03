import {Album} from "./album";
import {Artist} from "./artist";

export class Track {
    id: string = null;
    name: string = null;
    duration_ms: number = 0;
    explicit: boolean = false;
    popularity: number = 0;
    artists: Artist[] = null;
    album: Album = null;
    disc_number: number = 0;
    track_number: number = 0;
    available_markets: string[] = null;
    external_id: string = null; // Only deal with the ISRC ID
    spotify_url: string = null;
    href: string = null;
    preview_url: string = null;
    uri: string = null;

    constructor(source: any) {
        if (typeof source.id === "string") {
            this.id = source.id;
        }

        if (typeof source.name === "string") {
            this.name = source.name;
        }

        if (typeof source.duration_ms === "number") {
            this.duration_ms = source.duration_ms;
        }

        if (typeof source.explicit === "boolean") {
            this.explicit = source.explicit;
        }

        if (typeof source.popularity === "number") {
            this.popularity = source.popularity;
        }
        
        if (Array.isArray(source.artists) && source.artists.length > 0)
        {
            this.artists = [];
            source.artists.forEach(
                artist => this.artists.push(new Artist(artist))
            );
        }

        if (typeof source.album !== "undefined") {
            this.album = new Album(source.album);
        }

        if (typeof source.disc_number === "number") {
            this.disc_number = source.disc_number;
        }

        if (typeof source.track_number === "number") {
            this.track_number = source.track_number;
        }

        if (Array.isArray(source.available_markets) && source.available_markets.length > 0 && source.available_markets.every(value => typeof value == "string")) {
            this.available_markets = source.available_markets;
        }

        if (typeof source.external_ids.isrc === "string") {
            this.external_id = source.external_ids.isrc;
        }
        
        if (source.external_urls && typeof source.external_urls.spotify === "string") {
            this.spotify_url = source.external_urls.spotify;
        }

        if (typeof source.href === "string") {
            this.href = source.href;
        }

        if (typeof source.preview_url === "string") {
            this.preview_url = source.preview_url;
        }

        if (typeof source.uri === "string") {
            this.uri = source.uri;
        }
    }
}
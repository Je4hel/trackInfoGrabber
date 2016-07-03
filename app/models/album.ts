import {Constants} from "../app.component";

export class Album {
    id: string = null;
    name: string = null;
    album_type: AlbumType = AlbumType.Undefined;
    artworks: AlbumArtwork[] = null;
    available_markets: string[] = null;
    spotify_url: string = null;
    href: string = null;
    uri: string = null;

    constructor (source: any) {
        if (typeof source.id === "string") {
            this.id = source.id;
        }

        if (typeof source.name === "string") {
            this.name = source.name;
        }

        if (typeof source.album_type === "string") {
            switch (source.album_type) {
                case "album":
                    this.album_type = AlbumType.Album;
                    break;
                case "single":
                    this.album_type = AlbumType.Single;
                    break;
                case "compilation":
                    this.album_type = AlbumType.Compilation;
                    break;
                default:
                    this.album_type = AlbumType.Undefined;
            }
        }

        if (Array.isArray(source.images) && source.images.length > 0) {
            let artworksBySize: Array<AlbumArtwork> = [];
            source.images.forEach((image) => artworksBySize[image.width] = new AlbumArtwork(image));
            this.artworks = artworksBySize.filter(() => true); // Restarts the indices from 0 with no gaps

            while (this.artworks.length < 3) {
                this.artworks.push(new AlbumArtwork({ url: Constants.defaultAlbumArtworkPath, width: 250, height: 250 }));
            }
        }

        if (Array.isArray(source.available_markets) && source.available_markets.every(value => typeof value == "string")) {
            this.available_markets = source.available_markets;
        }
        
        if (source.external_urls && typeof source.external_urls.spotify === "string") {
            this.spotify_url = source.external_urls.spotify;
        }

        if (typeof source.href === "string") {
            this.href = source.href;
        }

        if (typeof source.uri === "string") {
            this.uri = source.uri;
        }
    }
}

export enum AlbumType {
    Undefined,
    Album,
    Single,
    Compilation
}

export class AlbumArtwork {
    url: string = "";
    height: number = 0;
    width: number = 0;

    constructor(source: any) {
        if (typeof source.url === "string") {
            this.url = source.url;
        }

        if (typeof source.height === "number") {
            this.height = source.height;
        }

        if (typeof source.width === "number") {
            this.width = source.width;
        }
    }
}
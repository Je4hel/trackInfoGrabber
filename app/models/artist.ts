export class Artist {
    id: string = null;
    name: string = null;
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
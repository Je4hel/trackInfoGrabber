import {Track} from "./track";

export class TrackSearchResult {
    href: string = null;
    limit: number = 0;
    offset: number = 0;
    total: number = 0;
    previous: string = null;
    next: string = null;
    items: Track[] = null;

    constructor(source: any) {
        if (typeof source.href === "string") {
            this.href = source.href;
        }

        if (typeof source.limit === "number") {
            this.limit = source.limit;
        }

        if (typeof source.offset === "number") {
            this.offset = source.offset;
        }

        if (typeof source.total === "number") {
            this.total = source.total;
        }

        if (typeof source.previous === "string") {
            this.previous = source.previous;
        }

        if (typeof source.next === "string") {
            this.next = source.next;
        }

        if (Array.isArray(source.items)) {
            this.items = new Array<Track>();

            source.items.forEach(
                track => this.items.push(new Track(track))
            );
        }
    }
}
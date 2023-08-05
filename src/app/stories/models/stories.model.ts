interface Multimedia {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
}

export interface Stories {
    title: string;
    abstract: string;
    uri: string;
    byline?: string;
    item_type: string;
    published_date: string;
    multimedia?: Multimedia[];
}

export interface StoriesResponse {
    status: string;
    copyright: string;
    section: string;
    last_updated: string;
    num_results: number;
    results: Stories[]
}


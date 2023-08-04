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
    section: string;
    subsection: string;
    title: string;
    abstract: string;
    url: string;
    uri: string;
    byline: string;
    item_type: string;
    updated_date: string;
    created_date: string;
    published_date: string;
    material_type_facet: string;
    kicker: string;
    des_facet: any[];
    org_facet: any[];
    per_facet: any[];
    geo_facet: any[];
    multimedia: Multimedia[];
    short_url: string;
}

export interface StoriesResponse {
    status: string;
    copyright: string;
    section: string;
    last_updated: string;
    num_results: number;
    results: Stories[]
}


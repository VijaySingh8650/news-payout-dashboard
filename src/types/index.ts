export type TypeOfFormData = {
    email: string;
    password: string;
}

export type TypeOfSource = {
    id?: string;
    name?: string;
}

export type TypeOfArticleData = {
    id: number,
    author?: string;
    title?: string;
    source?: TypeOfSource;
    description?: string;
    url?: string;
    urlToImage?: string;
    publishedAt?: string;
    content?: string;
    type?: "News" | "Blog";
    rate?: number;
}


export type TypeOfFetchedData  = {
    status: string;
    totalResults: number;
    articles: TypeOfArticleData[];
}

export type TypeOfDropDown = {
    id: number;
    value: string;
    label: string;
}

export type TypeOfFilters = {
    author?: string;
    type?:  string;
}


export type TypeOfArticleRate = {
    id: number,
    rate: number;
}

export type TypeOfCSVRows = {

    Author?: string;
    Type?: string;
    Headline?: string;
    Price?: number;
}
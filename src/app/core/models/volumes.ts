export interface Volumes {
    kind?:       string;
    totalItems?: number;
    items?:      Volume[];
}

export interface Volume {
    kind?:       string;
    id?:         string;
    etag?:       string;
    selfLink?:   string;
    volumeInfo?: VolumeInfo;
    saleInfo?:   SaleInfo;
    accessInfo?: AccessInfo;
    searchInfo?: SearchInfo;
}

export interface AccessInfo {
    country?:                string;
    viewability?:            string;
    embeddable?:             boolean;
    publicDomain?:           boolean;
    textToSpeechPermission?: string;
    epub?:                   Epub;
    pdf?:                    Epub;
    webReaderLink?:          string;
    accessViewStatus?:       string;
    quoteSharingAllowed?:    boolean;
}

export interface Epub {
    isAvailable?:  boolean;
    acsTokenLink?: string;
}

export interface SaleInfo {
    country?:     string;
    saleability?: string;
    isEbook?:     boolean;
}

export interface SearchInfo {
    textSnippet?: string;
}

export interface VolumeInfo {
    title?:               string;
    authors?:             string[];
    publishedDate?:       string;
    description?:         string;
    industryIdentifiers?: IndustryIdentifier[];
    readingModes?:        ReadingModes;
    pageCount?:           number;
    printType?:           string;
    categories?:          string[];
    averageRating?:       number;
    ratingsCount?:        number;
    maturityRating?:      string;
    allowAnonLogging?:    boolean;
    contentVersion?:      string;
    imageLinks?:          ImageLinks;
    language?:            string;
    previewLink?:         string;
    infoLink?:            string;
    canonicalVolumeLink?: string;
    publisher?:           string;
    panelizationSummary?: PanelizationSummary;
    subtitle?:            string;
}

export interface ImageLinks {
    smallThumbnail?: string;
    thumbnail?:      string;
}

export interface IndustryIdentifier {
    type?:       string;
    identifier?: string;
}

export interface PanelizationSummary {
    containsEpubBubbles?:  boolean;
    containsImageBubbles?: boolean;
}

export interface ReadingModes {
    text?:  boolean;
    image?: boolean;
}


export interface WixDataItem {
  _id?: string;
}

export interface WixDataQueryResult<T extends WixDataItem = WixDataItem> {
  items: T[];
  totalCount?: number;
  hasNext: () => boolean;
}

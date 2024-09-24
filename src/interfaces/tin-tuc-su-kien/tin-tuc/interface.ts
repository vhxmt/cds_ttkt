// src/interfaces/tin-tuc-su-kien/tin-tuc

export interface NewsItem {
    id:string;
    title: string;
    url: string;
  }
  
  
  export interface NewsData {
    links: NewsItem[];
  }

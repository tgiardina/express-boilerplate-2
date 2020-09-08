export interface IArticlePostBody {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }
}

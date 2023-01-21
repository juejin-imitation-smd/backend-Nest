export class CreateArticlesDto {
  title: string;
  time: string;
  label: string;
  sub_tabs: string[];
  content: string;
  image: string;
  author_id: number;
  view_count: number;
  like_count: number;
  comment_count: number;
}

import { PaginationQuery } from 'src/cms/common/dto/pagination-query.dto';

export class FindAllAuthorDto extends PaginationQuery {
  username: string;
}

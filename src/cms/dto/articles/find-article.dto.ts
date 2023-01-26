import { PaginationQuery } from 'src/cms/common/dto/pagination-query.dto';

export class FindAllAtricleDto extends PaginationQuery {
  title: string;
}

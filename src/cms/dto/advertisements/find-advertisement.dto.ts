import { PaginationQuery } from 'src/cms/common/dto/pagination-query.dto';

export class FindAllAdvertisementDto extends PaginationQuery {
  title: string;
}

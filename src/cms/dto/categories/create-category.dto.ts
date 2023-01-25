export class CreateCateGoryDto {
  name: string;
  url: string;
  labels: Array<{
    label: string;
  }>;
}

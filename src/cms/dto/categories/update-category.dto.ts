export class UpdateCateGoryDto {
  id: number;
  name: string;
  url: string;
  labels: Array<{
    label: string;
  }>;
}

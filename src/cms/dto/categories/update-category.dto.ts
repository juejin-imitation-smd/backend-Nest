export class UpdateCateGoryDto {
  id: number;
  name: string;
  labels: Array<{
    label: string;
  }>;
}

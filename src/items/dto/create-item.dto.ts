export class CreateItemDto {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly qty: number;
  readonly createdDate: Date;
  readonly updatedDate: Date;
}

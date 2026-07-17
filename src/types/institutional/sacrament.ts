export interface Sacrament {
  id: string;
  name: string;
  description: string | null;
  requiredDocuments: string | null;
  displayOrder: number;
}

export type CreateSacramentInput = Omit<Sacrament, "id">;

export type UpdateSacramentInput = Partial<CreateSacramentInput>;
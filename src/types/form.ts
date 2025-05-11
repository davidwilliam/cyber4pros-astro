export type FormFieldType = 'text' | 'email' | 'tel' | 'textarea';

export interface FormField {
  label: string;
  type: FormFieldType;
  name: string;
} 
export interface HttpResponse<T> {
  id: string;
  code: string;
  message: string;
  data: T;
  success: boolean;
  error?: FormError;
}

export interface FormError {
  objectErrors: FormObjectError[];
  fieldErrors: FormFieldError[];
}

export interface FormObjectError {
  name: string;
  message: string;
}

export interface FormFieldError {
  field: string;
  name: string;
  message: string;
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notBlank(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (typeof value === 'string' && value.length > 0 && value.trim().length === 0) {
    return { blank: true };
  }
  return null;
}

// Factory: takes a word and returns a validator that rejects it
export function forbiddenValue(word: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (typeof value === 'string' && value.trim().toLowerCase() === word.toLowerCase()) {
      return { forbidden: true };
    }
    return null;
  };
}
import { InjectionToken } from '@angular/core';

export type FormErrorsMessages = typeof formErrorsMessage;

const formErrorsMessage = {
  required: (): string => 'El campo es requerido',
  min: ({ min }: Record<string, number>): string => `Valor mínimo ${min}`,
  max: ({ max }: Record<string, number>): string => `Valor máximo ${max}`,
  email: (): string => 'Esto no es un correo',
  minlength: ({
    requiredLength,
    actualLength,
  }: Record<string, number>): string =>
    `Mínimo ${requiredLength} caracteres, actual ${actualLength}`,
  maxlength: ({
    requiredLength,
    actualLength,
  }: Record<string, number>): string =>
    `Máximo ${requiredLength} caracteres, actual ${actualLength}`,
  pattern: (): string => 'El valor introducido no es válido',
};

export const FORM_ERRORS = new InjectionToken<FormErrorsMessages>(
  'FORM_ERRORS',
  {
    providedIn: 'root',
    factory: (): FormErrorsMessages => formErrorsMessage,
  }
);

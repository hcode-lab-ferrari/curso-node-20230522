import { BadRequestException } from '@nestjs/common';

export const isValidNumber = (id: number, message = 'O Id é inválido') => {
  id = Number(id);
  if (isNaN(id)) {
    throw new BadRequestException(message);
  }
  return id;
};

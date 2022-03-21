import { Transform, TransformFnParams } from 'class-transformer';

const toInt = ({ value }: TransformFnParams) =>
  Array.isArray(value) ? value.map(Number) : Number(value);

export const ToInt = () => Transform(toInt);

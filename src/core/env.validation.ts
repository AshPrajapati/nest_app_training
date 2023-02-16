import { plainToInstance } from 'class-transformer';
import { IsInt, IsNotEmpty, validateSync } from 'class-validator';

class EnvVariables {
  @IsNotEmpty()
  @IsInt()
  PORT: number;

  @IsNotEmpty()
  SECRET_KEY: string;
}

export function validate(config: Record<string, string>) {
  const envVariables = plainToInstance(EnvVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(envVariables, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());
  return envVariables;
}

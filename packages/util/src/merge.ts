import { type AutoPartial, type NotNever, type Simplify } from './types.js';

export type Merged<TBase, TValues> = TValues extends [infer TFirst, ...infer TRest]
  ? Merged<
      {
        [P in Extract<keyof TBase | keyof TFirst, string>]: P extends keyof TBase
          ? P extends keyof TFirst
            ? undefined extends NotNever<TFirst[P]>
              ? NotNever<TBase[P]> | Exclude<NotNever<TFirst[P]>, undefined>
              : NotNever<TFirst[P]>
            : NotNever<TBase[P]>
          : NotNever<TFirst[P & keyof TFirst]>;
      },
      TRest
    >
  : AutoPartial<TBase>;

export const merge = <TBase extends object, TValues extends readonly (object | undefined | null)[]>(
  base: TBase | undefined | null,
  ...values: TValues
): Simplify<Merged<TBase, TValues>> => {
  let result: Record<string, any> = base ?? {};

  for (const value of values) {
    if (value == null) continue;
    result = Object.assign({}, result, Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)));
  }

  return result as Simplify<Merged<TBase, TValues>>;
};

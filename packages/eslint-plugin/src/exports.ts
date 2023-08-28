import { type TSESLint } from '@typescript-eslint/utils';

import noThrowNew from './rules/no-throw-new.js';

export default {
  rules: {
    'no-throw-new': noThrowNew,
  } as const satisfies Record<string, TSESLint.RuleModule<string, unknown[]>>,
};

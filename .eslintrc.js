module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'eslint:recommended',
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/recommended'
    ],
    // required to lint *.vue files
    plugins: ['vue'],
    // add your custom rules here
    rules: {
        'semi': ['error', 'never'],
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'vue/max-attributes-per-line': ['warn', {'singleline': 4}],
        'no-console': 'error',
        'no-debugger': 'error',
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'none',
                ignoreRestSiblings: false
            }
        ],
        'no-unused-expressions': 'off',
        'arrow-body-style': ['error', 'as-needed'],
        'quote-props': ['error', 'consistent'],
        'comma-dangle': ['error', 'never'],
        'consistent-return': 'off',
        'no-shadow': 'off',
        'no-plusplus': 'off',
        'no-prototype-builtins': 'off',
        'no-underscore-dangle': 'off',
        'global-require': 'off',
        'function-paren-newline': ['error', { minItems: 5 }],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'prefer-arrow-callback': ['error', {}],
        'func-names': 'off',
        'import/extensions': 'off',
        'eqeqeq': 'off',
        'import/prefer-default-export': 'off',
        'vue/array-bracket-spacing': 'error',
        'vue/arrow-spacing': 'error',
        'vue/brace-style': 'error',
        'vue/no-restricted-syntax': 'error',
        'vue/object-curly-spacing': ['error', 'always'],
        'vue/space-unary-ops': 'error',
        'vue/v-on-function-call': 'off',
        'vue/camelcase': 'error',
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        'vue/match-component-file-name': [
            'error',
            {
                extensions: ['vue'],
                shouldMatchCase: false
            }
        ],
        'vue/valid-v-bind-sync': 'error',
        'vue/component-tags-order': ['error', {
            'order': ['template', 'script', 'style']
        }],
        'no-empty': ['error', { allowEmptyCatch: true }],
        'space-before-blocks': ['error', 'always']
    }
}

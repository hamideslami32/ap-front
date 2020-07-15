module.exports = {
    plugins: ['stylelint-scss'],
    extends: ['stylelint-config-recommended-scss'],
    // add your custom config here
    // https://stylelint.io/user-guide/configuration
    rules: {
        'indentation': 4,
        'string-quotes': 'single',
        'no-duplicate-selectors': true,
        'color-hex-case': 'lower',
        'declaration-block-trailing-semicolon': 'always',
        'declaration-colon-space-before': 'never',
        'declaration-colon-space-after': 'always',
        'property-no-vendor-prefix': true,
        'value-no-vendor-prefix': true,
        'font-weight-notation': 'numeric',
        'font-family-name-quotes': 'always-where-required',
        'comment-whitespace-inside': 'always',
        'at-rule-no-vendor-prefix': true,
        'media-feature-range-operator-space-before': 'always',
        'media-feature-range-operator-space-after': 'always',
        'media-feature-parentheses-space-inside': 'never',
        'media-feature-name-no-vendor-prefix': true,
        'media-feature-colon-space-before': 'never',
        'media-feature-colon-space-after': 'always',
        'block-no-empty': null,
        'property-no-unknown': null,
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'no-empty-source': null,
        'no-descending-specificity': null
    }
}

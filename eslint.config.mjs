// @ts-check
import pluginVue from 'eslint-plugin-vue'
import withNuxt from './.nuxt/eslint.config.mjs'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'
import tailwind from 'eslint-plugin-tailwindcss'

export default withNuxt(
  // Your custom configs here
  ...pluginVue.configs['flat/recommended'],
  ...vueI18n.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@intlify/vue-i18n/no-unused-keys': [
        'error',
        {
          extensions: ['.js', '.vue'],
        },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/html-indent': ['error', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      }],
      'vue/block-lang': ['error',
        {
          script: {
            lang: 'ts',
          },
        },
      ],
      'vue/no-multiple-template-root': 'off',
      'vue/block-tag-newline': ['error', {
        singleline: 'always',
        multiline: 'always',
      }],
      'vue/no-root-v-if': 'off',
      'vue/no-useless-v-bind': ['error', {
        ignoreIncludesComment: false,
        ignoreStringEscape: false,
      }],
      'vue/max-attributes-per-line': [
        'warn',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],
    },
    settings: {
      'vue-i18n': {
        localeDir: './i18n/locales/*.{json,json5,yaml,yml}',
        messageSyntaxVersion: '^11.0.0',
      },
    },
  },
)

const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const uglify = require('rollup-plugin-uglify');

const format = process.env.BABEL_ENV;
const production = process.env.NODE_ENV === 'production';

const babelPlugins = ['external-helpers'];
if (production) {
  babelPlugins.push('transform-react-remove-prop-types');
}

const plugins = [
  commonjs({
    include: 'node_modules/**',
  }),
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [
      ['env', {
        targets: {
          browsers: ['last 2 versions', 'safari > 7'],
        },
        modules: false,
      }],
      'stage-0',
      'react',
    ],
    plugins: babelPlugins,
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true,
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
];

if (production) {
  plugins.push(uglify());
}

export default {
  input: 'src/modules.js',
  output: {
    file: `${format === 'umd' ? 'dist' : format}/react-md${production ? '.min' : ''}.js`,
    format,
  },
  name: 'ReactMD',
  globals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  plugins,
  external: [
    'react',
    'react-dom',
  ],
  sourcemap: true,
};

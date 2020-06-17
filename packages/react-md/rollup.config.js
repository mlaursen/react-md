import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

function createConfig(type) {
  const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
  };

  let fileNameSuffix;
  switch (type) {
    case 'svg':
      fileNameSuffix = '-with-svg-icons';
      break;
    case 'font':
      fileNameSuffix = '-with-font-icons';
      break;
    default:
      fileNameSuffix = '';
  }

  return {
    input: `src/${type}.ts`,
    output: [
      {
        file: `dist/umd/react-md${fileNameSuffix}.development.js`,
        name: 'ReactMD',
        format: 'umd',
        globals,
        sourcemap: true,
      },
      {
        file: `dist/umd/react-md${fileNameSuffix}.production.min.js`,
        name: 'ReactMD',
        format: 'umd',
        globals,
        plugins: [terser()],
      },
    ],
    onwarn: (warning, warn) => {
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }

      warn(warning);
    },
    external: ['react', 'react-dom'],
    plugins: [
      resolve(),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  };
}

module.exports = ['rollup', 'svg', 'font'].map(createConfig);

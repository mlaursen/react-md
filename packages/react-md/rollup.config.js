import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

function createConfig(type) {
  const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-md': 'ReactMD',
  };

  const external = ['react', 'react-dom', 'react-md'];

  let umdSuffix;
  let fileNameSuffix;
  switch (type) {
    case 'svg':
      umdSuffix = 'IconSVG';
      fileNameSuffix = '.svg-icon';
      break;
    case 'font':
      umdSuffix = 'IconFont';
      fileNameSuffix = '.font-icon';
      break;
    default:
      external.pop();
      delete globals['react-md'];
      umdSuffix = '';
      fileNameSuffix = '';
  }

  return {
    input: `src/${type}.ts`,
    output: [
      {
        file: `dist/umd/react-md${fileNameSuffix}.development.js`,
        name: `ReactMD${umdSuffix}`,
        format: 'umd',
        globals,
        sourcemap: true,
      },
      {
        file: `dist/umd/react-md${fileNameSuffix}.production.min.js`,
        name: `ReactMD${umdSuffix}`,
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
    external,
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

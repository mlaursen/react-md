const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const { uglify } = require('rollup-plugin-uglify');

function createConfig(production) {
  const suffix = production ? '.production.min' : '.development';
  return {
    input: 'src/index.ts',
    output: {
      file: `dist/umd/react-md${suffix}.js`,
      name: 'ReactMD',
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      sourcemap: !production,
    },
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
      production && uglify(),
    ].filter(Boolean),
  };
}

module.exports = [createConfig(false), createConfig(true)];

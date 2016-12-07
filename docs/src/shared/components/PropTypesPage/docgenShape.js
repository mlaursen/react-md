import { PropTypes } from 'react';
import propsShape from './propsShape';
import methodShape from './methodShape';

export default PropTypes.shape({
  component: PropTypes.string.isRequired,
  description: PropTypes.string,
  source: PropTypes.string.isRequired,
  methods: PropTypes.arrayOf(methodShape),
  props: PropTypes.arrayOf(propsShape),
});

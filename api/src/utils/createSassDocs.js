import path from 'path';
import { parse } from 'sassdoc';

export default async function createSassDocs() {
  return (await parse(path.resolve(process.cwd(), '..', 'src', 'scss'))).filter(sassdoc => sassdoc.access !== 'private');
}

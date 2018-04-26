/* eslint-env jest */
import { Version } from 'react-md';
import { GITHUB_URL } from 'constants/application';
import {
  addGithubLinks,
  addGithubHashLinks,
  addGithubUserLinks,
  addAdditionalLineToSee,
  addVersionToUMD,
} from '../preTransforms';

describe('formatMarkdown', () => {
  describe('addGithubLinks', () => {
    it('should update markdown to include github links for commit, pull, and issues', () => {
      expect(addGithubLinks('[commit-sha3242]')).toBe(`[sha3242](${GITHUB_URL}/commit/sha3242)`);
      expect(addGithubLinks('[pull-123]')).toBe(`[#123](${GITHUB_URL}/pull/123)`);
      expect(addGithubLinks('[issues-502]')).toBe(`[#502](${GITHUB_URL}/issues/502)`);
    });
  });

  describe('addGithubHashLinks', () => {
    it('should correctly include github links for #commits, #pull, and #issues', () => {
      expect(addGithubHashLinks('#commit-sha1234')).toBe(`${GITHUB_URL}/commit/sha1234`);
      expect(addGithubHashLinks('#pull-sha1234')).toBe(`${GITHUB_URL}/pull/sha1234`);
      expect(addGithubHashLinks('#issues-sha1234')).toBe(`${GITHUB_URL}/issues/sha1234`);
    });
  });

  describe('addGithubUserLinks', () => {
    it('should correctly add user links', () => {
      expect(addGithubUserLinks('[@mlaursen]')).toBe('[@mlaursen](https://github.com/mlaursen)');
      expect(addGithubUserLinks('[@imaginaryname]')).toBe('[@imaginaryname](https://github.com/imaginaryname)');
    });
  });

  describe('addAdditionalLineToSee', () => {
    it('should add an extra line before any @see delcarations that start the line', () => {
      expect(addAdditionalLineToSee('\n@see Freddy')).toBe('\n\n@see Freddy');
      expect(addAdditionalLineToSee('Hello, world!\n@see hello')).toBe('Hello, world!\n\n@see hello');
    });
  });

  describe('addVersionToUMD', () => {
    const unpkg = 'https://unpkg.com';

    it('should add the current version for any unpkg links to react-md', () => {
      const js = 'react-md.min.js';
      const css = 'react-md.light-blue_pink.min.css';
      expect(addVersionToUMD(`${unpkg}/react-md/dist/${js}`)).toBe(`${unpkg}/react-md@${Version}/dist/${js}`);
      expect(addVersionToUMD(`${unpkg}/react-md/dist/${css}`)).toBe(`${unpkg}/react-md@${Version}/dist/${css}`);
    });

    it('should not update unpkg links that are not for react-md', () => {
      const react = `${unpkg}/react/umd/react-md.production.min.js`;
      const faker = `${unpkg}/faker/dist/react-md.min.js`;
      expect(addVersionToUMD(react)).toBe(react);
      expect(addVersionToUMD(faker)).toBe(faker);
    });
  });
});

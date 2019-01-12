export default function createIndexTemplate(name: string) {
  return `import ${name} from "./${name}";

export default ${name};
`;
}

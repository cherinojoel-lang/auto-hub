const IMAGE_IMPORT_PATH = '@/components/ui/image';

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Use Image component instead of primitive img tags',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [], // no options
  },
  create(context) {
    let hasImageImport = false;
    let imageImportName = 'Image'; // default

    return {
      ImportDeclaration(node) {
        if (node.source.value === IMAGE_IMPORT_PATH) {
          hasImageImport = true;
          const defaultSpecifier = node.specifiers.find(s => s.type === 'ImportDefaultSpecifier');
          const namedSpecifier = node.specifiers.find(s => s.type === 'ImportSpecifier' && s.imported.name === 'Image');

          if (namedSpecifier) {
              imageImportName = namedSpecifier.local.name;
          } else if (defaultSpecifier) {
              imageImportName = defaultSpecifier.local.name;
          }
        }
      },
      JSXOpeningElement(node) {
        if (node.name.name === 'img') {
          context.report({
            node,
            message: `Use the custom \`<Image>\` component from \`${IMAGE_IMPORT_PATH}\` instead of \`<img>\`.`,
            fix(fixer) {
              const fixes = [];
              if (!hasImageImport) {
                // Ideally, insert at the top of the file.
                // A robust implementation would find the last import declaration.
                // For simplicity, inserting at the beginning of the program.
                fixes.push(fixer.insertTextBeforeRange([0, 0], `import { Image } from '${IMAGE_IMPORT_PATH}';\n`));
                hasImageImport = true; // prevent multiple imports if multiple violations exist
              }

              // Replace <img> tag name
              fixes.push(fixer.replaceText(node.name, imageImportName));

              // Also handle closing tag if it exists (e.g., <img></img>)
              if (!node.selfClosing) {
                 const parent = node.parent;
                 if (parent.closingElement) {
                     fixes.push(fixer.replaceText(parent.closingElement.name, imageImportName));
                 }
              }

              return fixes;
            },
          });
        }
      },
    };
  },
};

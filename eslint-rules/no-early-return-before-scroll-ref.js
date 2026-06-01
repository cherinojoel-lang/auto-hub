export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure early returns happen *after* scroll refs are assigned and observed',
      category: 'Possible Errors',
      recommended: true,
    },
    schema: [], // no options
  },
  create(context) {
    let hasScrollRefDeclaration = false;
    let scrollRefName = null;
    let earliestReturnLine = null;

    return {
      VariableDeclarator(node) {
        if (
          node.init &&
          node.init.type === 'CallExpression' &&
          node.init.callee.name === 'useScrollToTop' &&
          node.id.type === 'Identifier'
        ) {
          hasScrollRefDeclaration = true;
          scrollRefName = node.id.name;
        }
      },

      ReturnStatement(node) {
        // Track the earliest return statement in the component body
        if (node.parent.type === 'BlockStatement' && node.parent.parent.type === 'ArrowFunctionExpression' || node.parent.parent.type === 'FunctionDeclaration') {
             if (earliestReturnLine === null || node.loc.start.line < earliestReturnLine) {
                 earliestReturnLine = node.loc.start.line;
             }
        }
      },

      JSXElement(node) {
        // We look for elements that might be the main wrapper
        if (hasScrollRefDeclaration && scrollRefName && node.openingElement) {
           const hasRefProp = node.openingElement.attributes.some(
              attr => attr.type === 'JSXAttribute' && attr.name.name === 'ref' &&
                      attr.value && attr.value.type === 'JSXExpressionContainer' &&
                      attr.value.expression.name === scrollRefName
           );

           if (hasRefProp && earliestReturnLine !== null && earliestReturnLine < node.loc.start.line) {
               context.report({
                 node,
                 message: `Early returns must happen AFTER the scroll ref (${scrollRefName}) is attached to the DOM element. Otherwise, useScrollToTop cannot observe the element when data is still loading.`,
               });
           }
        }
      }
    };
  },
};

const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const { data, errors } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              title
              path
              date
            }
            fileAbsolutePath
          }
        }
      }
    }
  `);
  if (errors) throw errors;

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const stringNewPathNodes = makeStringNewPathNodes(node);
    createPage({
      path: stringNewPathNodes,
      context: {
        html: node.html,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
      },
      component: path.resolve(__dirname, './src/templates/PostTemplate.jsx'),
    });
  });
};

function makeStringNewPathNodes(node) {
  const pathNodes = node.fileAbsolutePath.split('/');
  const newPathNodes = [];
  if (pathNodes.length === 9) {
    const fileName = pathNodes[pathNodes.length - 1];
    const pureFileName = fileName.substring(0, fileName.length - 3);
    newPathNodes.push(pathNodes[pathNodes.length - 2]);
    newPathNodes.push(pureFileName);
    newPathNodes.push(node.frontmatter.date);
  } else {
    newPathNodes.push(pathNodes[pathNodes.length - 3]);
    newPathNodes.push(pathNodes[pathNodes.length - 2]);
    newPathNodes.push(node.frontmatter.date);
  }
  return newPathNodes.join('/');
}

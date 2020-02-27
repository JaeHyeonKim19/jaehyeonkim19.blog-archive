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
          }
        }
      }
    }
  `);
  if (errors) throw errors;

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    {
      console.log('hi');
    }
    createPage({
      path: node.frontmatter.path,
      context: {
        html: node.html,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
      },
      component: path.resolve(__dirname, './src/templates/PostTemplate.jsx'),
    });
  });
};

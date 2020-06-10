import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/common/layout';
// import Image from '../components/common/image';
import SEO from '../components/common/seo';

const IndexPage = () => {
  const query = graphql`
    {
      allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            excerpt(truncate: true, pruneLength: 200)
            frontmatter {
              title
              path
              date
            }
            id
            fileAbsolutePath
          }
        }
      }
    }
  `;
  const data = useStaticQuery(query);

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

  return (
    <Layout>
      <SEO title="Home" />
      <h1>최근 작성한 게시글 목록</h1>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          const stringNewPathNodes = makeStringNewPathNodes(node);
          const yearMonthDate = node.frontmatter.date.split(" ")[0];
          return (
            <li key={node.id}>
              <h2>
                <Link to={stringNewPathNodes}>{node.frontmatter.title}</Link>
              </h2>
              <h3>{yearMonthDate}</h3>
              <p>{node.excerpt}</p>
              <hr />
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default IndexPage;

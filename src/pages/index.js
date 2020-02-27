import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/common/layout';
import Image from '../components/common/image';
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
              date(formatString: "YYYY-MM-DD HH:mm:ss")
            }
            id
          }
        }
      }
    }
  `;
  const imageQuery = graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `;

  const data = useStaticQuery(query);

  return (
    <Layout>
      <SEO title="Home" />
      <h1>최근 작성한 게시글 목록</h1>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id}>
            <h2>
              <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
            </h2>
            <h3>{node.frontmatter.date}</h3>
            <p>{node.excerpt}</p>
            <hr />
          </li>
        ))}
      </ul>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image query={imageQuery} />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

export default IndexPage;

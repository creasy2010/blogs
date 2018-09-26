import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

import AlgoliaIcon from "!svg-react-loader!../../images/svg-icons/algolia.svg?name=AlgoliaIcon";
import ReactIcon from "!svg-react-loader!../../images/svg-icons/react.svg?name=ReactIcon";
import GraphqlIcon from "!svg-react-loader!../../images/svg-icons/graphql.svg?name=GraphqlIcon";
import JssIcon from "!svg-react-loader!../../images/svg-icons/jss.svg?name=JssIcon";
import ReduxIcon from "!svg-react-loader!../../images/svg-icons/redux.svg?name=ReduxIcon";
import GatsbyIcon from "!svg-react-loader!../../images/svg-icons/gatsby.svg?name=GatsbyIcon";
import WebpackIcon from "!svg-react-loader!../../images/svg-icons/webpack.svg?name=WebpackIcon";
import NodejsIcon from "!svg-react-loader!../../images/svg-icons/Node.svg?name=NodejsIcon";
import TypescriptIcon from "!svg-react-loader!../../images/svg-icons/typescript.svg?name=TypescriptIcon";
import BabelIcon from "!svg-react-loader!../../images/svg-icons/babel.svg?name=BabelIcon";
import GaIcon from "!svg-react-loader!../../images/svg-icons/google-analytics.svg?name=GaIcon";

const styles = theme => ({
  stack: {
    display: "none",
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      display: "block",
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      padding: "1em 2em"
    }
  },
  box: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  link: {
    display: "inline-block",
    padding: "8px"
  },
  svg: {
    width: "22px",
    height: "22px"
  },
  header: {
    textAlign: "center",
    fontSize: ".85em",
    letterSpacing: ".3em",
    width: "100%",
    margin: "0 0 .8em 0",
    fontWeight: 300
  }
});

const StackIcons = props => {
  const { classes } = props;

  const items = [
    { name: "node.Js", url: "https://nodejs.org/en/", comp: NodejsIcon },
    { name: "typescript", url: "https://www.typescriptlang.org/", comp: TypescriptIcon },
    { name: "python", url: "https://www.python.org/", comp: GatsbyIcon },
    { name: "googleAnalytics", url: "https://analytics.google.com/", comp: GaIcon },
    { name: "gatsby", url: "https://www.gatsbyjs.org/", comp: GatsbyIcon },
    { name: "react", url: "https://reactjs.org/", comp: ReactIcon },
    { name: "graphql", url: "http://graphql.org/", comp: GraphqlIcon },
    { name: "jss", url: "http://cssinjs.org/", comp: JssIcon },
    { name: "redux", url: "https://redux.js.org/", comp: ReduxIcon },
    { name: "algolia", url: "https://www.algolia.com/", comp: AlgoliaIcon },
    { name: "webpack", url: "https://webpack.js.org/", comp: WebpackIcon },
    { name: "babel", url: "https://babeljs.io/", comp: BabelIcon }
  ];

  return (
    <div className={classes.stack}>
      <h5 className={classes.header}>love:</h5>
      <div className={classes.box}>
        {items.map(item => {
          const Icon = item.comp;
          return (
            <a
              href={item.url}
              key={item.name}
              className={classes.link}
              target="_blank"
              rel="noopener noreferrer"
              title={item.name}
            >
              <Icon className={classes.svg} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

StackIcons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(StackIcons);

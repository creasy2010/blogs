import React from "react";
import PropTypes from "prop-types";
require("core-js/fn/array/find");


class PostComments extends React.Component{

  componentDidMount(){

    if(window.Gitment){
      const gitment = new window.Gitment({
        id:decodeURIComponent(window.location.pathname),
        owner: 'creasy2010',
        repo: 'https://github.com/creasy2010/idea.git',
        oauth: {
          client_id: 'c99db52faa5162491dbc',
          client_secret: '64608aa3f4dd9bb9a553d4c9568d710caebbe910',
        },
      });
      gitment.render('post-comments');
    }
  }

  render() {
    return (
      <div id="post-comments">

      </div>
    );
  }
}

PostComments.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  facebook: PropTypes.object.isRequired
};

export default PostComments;

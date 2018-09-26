import React from "react";
import PropTypes from "prop-types";
require("core-js/fn/array/find");


class PostComments extends React.Component{

  componentDidMount(){

    if(window.Gitment){
      const gitment = new window.Gitment({
        owner: 'creasy2010',
        repo: 'creasy2010.github.io',
        oauth: {
          client_id: '1816b072b2ee81711445',
          client_secret: '4e5dc1d0b197493c0871c14f35860f7c9d6cd317',
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

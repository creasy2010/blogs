import React from "react";
import PropTypes from "prop-types";
require("core-js/fn/array/find");


class PostComments extends React.Component{

  componentDidMount(){

    // if(window.Gitment){
    //   const gitment = new window.Gitment({
    //     id:decodeURIComponent(window.location.pathname),
    //     owner: 'creasy2010',
    //     repo: 'idea',
    //     oauth: {
    //       client_id: 'c99db52faa5162491dbc',
    //       client_secret: '64608aa3f4dd9bb9a553d4c9568d710caebbe910',
    //     },
    //   });
    //   gitment.render('post-comments');
    // }

    if(window.Gitalk){
      const gitalk = new Gitalk({
        clientID: 'c99db52faa5162491dbc',
        clientSecret: '64608aa3f4dd9bb9a553d4c9568d710caebbe910',
        repo: 'idea',
        owner: 'creasy2010',
        admin: ['creasy2010'],
        id: location.pathname,      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
      })
      gitalk.render('post-comments')
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

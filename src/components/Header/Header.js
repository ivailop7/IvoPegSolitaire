import React from 'react';
import classes from './Header.css';
import forkOnGitHub from '../../assets/fork_on_github.png';
import goToBlog from '../../assets/go_to_blog.png';

const header = () => {
    return(
        <div className={classes.cornerBanners}>
            <a href="https://github.com/ivailop7/IvoPegSolitaire">
            <img className={classes.rightLink}
                    src={forkOnGitHub}
                    alt="Fork me on GitHub" />
            </a>

            <a href="http://www.ivaylopavlov.com/">
            <img className={classes.leftLink}
                    src={goToBlog}
                    alt="Go To Blog" />
            </a>
            <center><h2>Ivo Peg Solitaire</h2></center>
        </div>
    );
}
export default header;
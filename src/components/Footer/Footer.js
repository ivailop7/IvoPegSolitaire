import React from 'react';
import facebookImg from '../../assets/facebook.png';
import googleImg from '../../assets/google.png';
import linkedinImg from '../../assets/linkedin.png';
import pinterestImg from '../../assets/pinterest.png';
import twitterImg from '../../assets/twitter.png';
import RulesModal from '../Rules/Rules';
import classes from './Footer.css';

const footer = (props) => {
    return(
        <div className={classes.shareButtons} id={classes.shareButton}>
            <center>
            <RulesModal/>
            <div className={classes.text}>Share the game</div>
            <a href="https://plus.google.com/share?url=http://pegsolitaire.ivaylopavlov.com">
                <img src={googleImg} alt="Google" />
            </a>
            <a href="http://www.facebook.com/sharer.php?u=http://pegsolitaire.ivaylopavlov.com">
                <img src={facebookImg} alt="Facebook" />
            </a>
            <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=http://pegsolitaire.ivaylopavlov.com">
                <img src={linkedinImg} alt="LinkedIn" />
            </a>
            <a href="https://twitter.com/share?url=http://pegsolitaire.ivaylopavlov.com&amp;text=I%20played%20Ivo%20Peg%20Solitaire%20at&amp;hashtags=IvoPegSolitaire">
                <img src={twitterImg} alt="Twitter" />
            </a>
            <a href="https://pinterest.com/pin/create/button/?url=pegsolitaire.ivaylopavlov.com&media=pegsolitaire.ivaylopavlov.com&description=Ivo%20Peg%20Solitaire%20Game">
                <img src={pinterestImg} alt="Pinterest" />
            </a>
            </center>
        </div>
    );
};

export default footer;
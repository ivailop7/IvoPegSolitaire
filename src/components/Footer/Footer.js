import React from 'react';
import classes from './Footer.css';
import googleImg from '../../assets/google.png';
import facebookImg from '../../assets/facebook.png';
import linkedinImg from '../../assets/linkedin.png';
import twitterImg from '../../assets/twitter.png';
import pinterestImg from '../../assets/pinterest.png';

const footer = (props) => {
    return(
        <div className={classes.shareButtons} id={classes.shareButton}>
            <div className={classes.text}>Share the game</div>
            <a href="https://plus.google.com/share?url=http://pegsolitaire.ivaylopavlov.com" 
               target="_blank">
                <img src={googleImg} alt="Google" />
            </a>
            <a href="http://www.facebook.com/sharer.php?u=http://pegsolitaire.ivaylopavlov.com" 
                target="_blank">
                <img src={facebookImg} alt="Facebook" />
            </a>
            <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=http://pegsolitaire.ivaylopavlov.com" 
                target="_blank">
                <img src={linkedinImg} alt="LinkedIn" />
            </a>
            <a href="https://twitter.com/share?url=http://pegsolitaire.ivaylopavlov.com&amp;text=I%20played%20Ivo%20Peg%20Solitaire%20at&amp;hashtags=IvoPegSolitaire" 
                target="_blank">
                <img src={twitterImg} alt="Twitter" />
            </a>
            <a href="https://pinterest.com/pin/create/button/?url=pegsolitaire.ivaylopavlov.com&media=pegsolitaire.ivaylopavlov.com&description=Ivo%20Peg%20Solitaire%20Game" 
                target="_blank">
                <img src={pinterestImg} alt="Pinterest" />
            </a>
        </div>
    );
};

export default footer;
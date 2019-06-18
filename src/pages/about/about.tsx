import * as React from 'react';

class About extends React.Component {

  public componentDidMount() {
    const canvas: any = document.getElementById("canvas")
    if (!canvas) {
      return
    }
    const context = canvas.getContext('2d')
    const image = new Image()
    image.src = require('src/assets/img/banner.png')
    image.onload = () => {
      context.drawImage(image, 0, 0)
    }
    const icon = new Image()
    icon.src = require('src/assets/img/banner-icon1.png')
    icon.onload = () => {
      
      context.arc(150, 150, 60, 0, 2 * Math.PI)
      context.clip()
      context.drawImage(icon, 90, 90, 120, 120)
    }
    
  }

  public render() {
    return (
      <div className="about">
        <canvas id="canvas" width="500" height="500" />
      </div>
    );
  }
}

export default About;

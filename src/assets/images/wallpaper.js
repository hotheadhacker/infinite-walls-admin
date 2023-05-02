import React from 'react';

const IconWallpaper = ({ height, width, fill }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  width={width} height={height}>
            <rect width="40" height="40" x="344" y="112" fill={fill} />
            <polygon fill={fill} points="72 72 224 72 224 40 40 40 40 224 72 224 72 72" />
            <polygon fill={fill} points="288 40 288 72 440 72 440 224 472 224 472 40 288 40" />
            <polygon fill={fill} points="72 288 40 288 40 472 224 472 224 440 72 440 72 288" />
            <polygon fill={fill} points="280.5 308.873 189.5 217.873 104 303.373 104 348.627 189.5 263.128 334.372 408 379.627 408 303.127 331.5 375.231 259.396 440 324.165 440 440 288 440 288 472 472 472 472 312 375.231 214.143 280.5 308.873" />
        </svg>
    )
}

export default IconWallpaper


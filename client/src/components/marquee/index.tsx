import React from 'react';
import Marquee from 'react-fast-marquee';

type Props = {
  text: string,
  speed?: number,
}

const CustomMarquee: React.FC<Props> = ( {text, speed = 50}) => {
  return (
    <Marquee pauseOnHover speed={speed} gradient={false}>
      <div style={{ whiteSpace: 'nowrap', fontFamily: 'NoveList', fontSize: '64px', paddingLeft: '14px'}}>
        {text}
      </div>
    </Marquee>
  );
};

export default CustomMarquee;
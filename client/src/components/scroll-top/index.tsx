import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
    children: React.ReactNode,
}

const ScrollToTop: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;

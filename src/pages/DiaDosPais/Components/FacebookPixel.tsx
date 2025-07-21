// components/FacebookPixel.tsx
import { Helmet } from 'react-helmet-async';

export function FacebookPixel() {
  return (
    <>
      <Helmet>
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '608682058563686');
            fbq('track', 'PageView');
          `}
        </script>
      </Helmet>
      
      {/* Noscript fica no body via JSX */}
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{display: 'none'}} 
          src="https://www.facebook.com/tr?id=608682058563686&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  );
}

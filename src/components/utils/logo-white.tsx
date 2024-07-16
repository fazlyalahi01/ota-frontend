import Image from 'next/image';
import React from 'react';

const LogoWhite: React.FC = () => {
    return (
    <Image
        alt="Logo"
        width={105}
        height={50}
        src="/assets/images/logo-white.png"
        style={{ marginLeft: 8 }}
      />
    );
};

export default LogoWhite;
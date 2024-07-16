import Image from 'next/image';
import React from 'react';

const logoWhite: React.FC = () => {
    return (
    <Image
        alt="Logo"
        width={105}
        height={50}
        src="/assets/images/logo.svg"
        style={{ marginLeft: 8 }}
      />
    );
};

export default logoWhite;
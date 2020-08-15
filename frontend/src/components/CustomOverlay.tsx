import React from 'react';

interface Props {
    id: string;
    delay?: number;
    text: string | React.ReactElement<any>;
    children: React.ReactElement<any>;
}

const CustomOverlay: React.FC<Props> = ({ id, delay, text, children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default CustomOverlay;

import React from 'react';

interface Props {
    label: string;
    error: string;
    id?: string;
    input: any;
    meta: any;
    help: any;
}

export const FieldGroup: React.FC<Props> = ({
    input,
    id,
    label,
    help,
    meta: { touched, error, warning },
    ...props
}) => (
    <div>
        <div>{label}</div>
        <div {...props} {...input} />
        {help && <div>{help}</div>}
        {touched && ((error && <span style={{ color: 'red' }}>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
);

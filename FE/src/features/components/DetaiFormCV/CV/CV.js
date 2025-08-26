import React from 'react';
import parse from 'html-react-parser';

export default function CV({ data }) {
    return (
        <div className='container' style={{ marginTop: "1rem", marginBottom: "2rem" }}>
            {data ? parse(data.content) : ""}
        </div>
    );
}

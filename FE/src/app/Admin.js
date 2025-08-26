import React from 'react';
import { useMatch } from 'react-router-dom';
import Nav from '../features/admin/Layout/Layout';

export default function Admin() {
    const match = useMatch("/admin/*"); // Kiểm tra nếu đường dẫn phù hợp với "/admin/*"

    return (
        <div>
            <Nav url={match?.pathname || "/admin"} path={match?.pathname || "/admin"} />
        </div>
    );
}

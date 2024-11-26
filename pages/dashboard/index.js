import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { isAuthenticated, removeToken } from '../../utils/auth';

export default function Dashboard() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        if (!isAuthenticated()) {
            window.location.href = '/';
            return;
        }

        const fetchReports = async () => {
            try {
                const { data } = await api.get('/reports');
                setReports(data);
            } catch (err) {
                console.error('Failed to fetch reports', err);
            }
        };

        fetchReports();
    }, []);

    const handleLogout = () => {
        removeToken();
        window.location.href = '/';
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.title}</td>
                            <td>{report.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

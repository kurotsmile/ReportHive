import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrendChart from '../../components/TrendChart';

const Reports = () => {
    const [period, setPeriod] = useState('week');
    const [summary, setSummary] = useState({});
    const [trendData, setTrendData] = useState([]);
    const [utilization, setUtilization] = useState([]);
    const [highlights, setHighlights] = useState([]);


    if (!trendData) {
        return <p>Loading...</p>;
    }

    // Lấy dữ liệu từ API
    useEffect(() => {
        axios.get(`/api/reports/summary?period=${period}`).then(res => setSummary(res.data));
        axios.get(`/api/reports/trend?period=${period}`).then(res => setTrendData(res.data));
        axios.get(`/api/reports/utilization?period=${period}`).then(res => setUtilization(res.data));
        axios.get(`/api/reports/highlights?period=${period}`).then(res => setHighlights(res.data));
        const fetchData = async () => {
            const res = await axios.get('/api/reports/trend?period=week');
            setTrendData(res.data);
        };
        fetchData();
    }, [period]);

    return (
        <div>
            <h1>Reports</h1>
            {/* Bộ lọc */}
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
            </select>

            {/* Tổng quan */}
            <section>
                <h2>Summary</h2>
                <p>Total Revenue: {summary.revenue}</p>
                <p>Build Quantity: {summary.buildQuantity}</p>
                <p>Total Mass Production Headcount: {summary.massHeadcount}</p>
                <p>NPI Headcount: {summary.npiHeadcount}</p>
            </section>

            {/* Biểu đồ xu hướng */}
            <section>
                <h2>Trend Chart</h2>
                <TrendChart data={trendData} />
            </section>

            {/* Sử dụng thiết bị */}
            <section>
                <h2>Utilization</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Process</th>
                            <th>Available Lines/Testers</th>
                            <th>Required Lines/Testers</th>
                            <th>Headcount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utilization.map((u, idx) => (
                            <tr key={idx}>
                                <td>{u.process}</td>
                                <td>{u.available}</td>
                                <td>{u.required}</td>
                                <td>{u.headcount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Điểm nhấn */}
            <section>
                <h2>Highlights</h2>
                <ul>
                    {highlights.map((h, idx) => (
                        <li key={idx}>{h.message}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Reports;

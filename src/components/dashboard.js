import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './dashboard.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios'

function Dashboard() {
    const navigate = useNavigate()
    const [slabs, setSlabs] = useState([
        { name: "First 100 units", rate: 23, maxUnits: 100 },
        { name: "100-250 units", rate: 30, maxUnits: 250 },
        { name: "250-500 units", rate: 34, maxUnits: 500 },
        { name: "Over 500 units", rate: 38, maxUnits: Infinity }
    ]);
    const [data, setdata] = useState([])
    const [name, setName] = useState('')
    const [selectedSlab, setSelectedSlab] = useState(slabs[0]);
    const [units, setUnits] = useState(0);
    const [totalRate, setTotalRate] = useState(0);
    const [previousRate, setPreviousRate] = useState(0);
    const [months, _] = useState(['Jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'])
    const [selectedMonth, setSelectedMonth] = useState(months[0]);

    const handleSlabChange = (e) => {
        const selected = slabs.find(slab => slab.name === e.target.value);
        setSelectedSlab(selected);
    }

    const handlemonthChange = (e) => {
        const selected = e.target.value;
        setSelectedMonth(selected);
    }

    const handleUnitsChange = (e) => {
        setUnits(parseInt(e.target.value));
    }

    const handleCalculate = () => {
        const { rate } = selectedSlab;
        const calculatedRate = units * rate;
        let temp = previousRate;
        setPreviousRate(totalRate);
        setTotalRate(calculatedRate);

        data.find((element, i) => {
            if (element.month === selectedMonth) {
                data[i] = { ...element, rate: calculatedRate }
                setdata(data)
                return true
            }
        }) ? setPreviousRate(temp) : setdata([...data, { month: selectedMonth, rate: calculatedRate }]);
    }

    const logout = () => {
        postdata()
        localStorage.clear()
        navigate('/')
    }

    const getData = (response) => {
        setdata(response.user.data)
        setPreviousRate(response.user.previousRate)
        setTotalRate(response.user.totalRate)
        setName(response.user.name)
    }
    const postdata = () => {
        axios.post("https://inquisitive-jumper-dog.cyclic.app/data", {
            data, previousRate, totalRate, token: localStorage.getItem('token')
        })
    }
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get('https://inquisitive-jumper-dog.cyclic.app/data', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            response.data.redirect ? logout() : getData(response.data)
        }
        fetchData()
    }, [])
    return (
        <div>
            <div id='nav'>
                <label id='name'>Name: {name}</label>
                <button onClick={logout} id='logout'>Logout</button>
                <br />
            </div>
            <div>
                <h2>Slab Rates</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Slab</th>
                            <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slabs.map((slab, index) => (
                            <tr key={index}>
                                <td>{slab.name}</td>
                                <td>{slab.rate} rs</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h1>Slab Rate Calculator</h1>
            <div>
                <label htmlFor="slab">Select Slab:</label>
                <select id="slab" onChange={handleSlabChange}>
                    {slabs.map((slab, index) => (
                        <option key={index} value={slab.name}>{slab.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="units">Monthly Units:</label>
                <input type="number" id="units" value={units} onChange={handleUnitsChange} />
            </div>
            <div>
                <label htmlFor="slab">Select Month:</label>
                <select id="month" onChange={handlemonthChange}>
                    {months.map((month, index) => (
                        <option key={index} value={month}>{month}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleCalculate}>Calculate</button>

            {totalRate !== 0 ? <div>
                <h2>Monthly Rate Calculation</h2>
                <p>Total rate: {totalRate}</p>
            </div> : false}

            {(data.length !== 0) ? <div>
                <h2>Monthly Rate Record</h2>
                <ul>
                    {data.map((rate, index) => (
                        <li key={index}>
                            <p>Month: {rate.month}</p>
                            <p>Rate: {rate.rate}</p>
                        </li>
                    ))}
                </ul>
            </div> : false}
            {previousRate !== 0 ? <div>
                <h2>Monthly Rate Comparison</h2>
                <p id='p'>Current Month Rate: {totalRate}</p>
                <p id='p'>Previous Month Rate: {previousRate}</p>
                <p id='p'>Difference: {((totalRate - previousRate) / (previousRate)) * 100}%</p>
            </div> : false}
            {(data.length !== 0) ? <div>
                <h2>Yearly Graph</h2>
                <LineChart width={500} height={300} data={data}>
                    <Line type="monotone" dataKey="rate" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </div> : false}
        </div>

    );
}
export default Dashboard
import {useSelector} from 'react-redux';
import {selectUser} from '../../redux/user/selectors';
import {AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

const MonthInfoChart = ({data}) => {

    const userData = useSelector(selectUser)

    if (!userData || !userData.data?.dailyNorm) {
        return null
    }

    return <ResponsiveContainer width="100%" height={300}>
        <AreaChart
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
        >
            <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="40%" stopColor="var(--main-color)" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="var(--main-color)" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false}/>
            <YAxis axisLine={false} tickLine={false} domain={[0, userData.data.dailyNorm]}/>
            <Tooltip formatter={(value, name) => {
                const customName = name === 'amount' ? 'Drunk' : name;
                return [`${value} ml`, customName];
            }} labelFormatter={(label) => `Day : ${label}`} />
            <Area type="linear" dataKey="amount" stroke="var(--hover-green-color)" strokeWidth={2} fill="url(#gradient1)"
                  dot={{
                      r: 10,
                      stroke: "var(--hover-green-color)",
                      strokeWidth: 3,
                      fill: "#ffffff",
                      fillOpacity: 1,
                  }}
                  activeDot={false}/>
        </AreaChart>
    </ResponsiveContainer>
}

export default MonthInfoChart
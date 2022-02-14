import React, { useState, useEffectm, useMemo, useEffect } from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import './home.css'
import { userData } from '../../dummyData'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import { axios } from '../../axios'

export default function Home() {
    const [userStats, setUserStats] = useState([])

    const MONTHS = useMemo(
        () => [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Agu',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        []
    )

    const getUserStatics = async () => {
        const res = await axios
            .get('api/user/userStatics')
            .catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            res.data.map((item) => {
                setUserStats((prev) => [
                    ...prev,
                    { name: MONTHS[item._id - 1], 'Active User': item.total },
                ])
            })
        }
    }

    useEffect(() => {
        getUserStatics()
    }, [MONTHS])

    return (
        <div className='home'>
            <FeaturedInfo />
            <Chart
                data={userStats}
                title='User Analytics'
                grid
                dataKey='Active User'
            />
            <div className='homeWidgets'>
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    )
}

import {NavLink} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {IBlacklistStatistics} from "@/entities/blacklists/statistics.ts";
import BlacklistService from "@/services/blacklistService.ts";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import {LineChart, PieChart} from "@mui/x-charts";

export default function BlacklistsStats() {
    const [stats, setStats] = useState<IBlacklistStatistics>()

    useEffect(() => {
        BlacklistService.getStatistics().then((response) => {
            setStats(response.data)
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка получения статистики!")
        })
    }, []);

    return <div className={"blacklists_stats"}>

        <div className={"blacklists_stats_actions"}>
            <h2>Панель управления блокировками</h2>
            <nav>
                <NavLink to={"/blacklists/view"}> / Просмотр</NavLink>
                <NavLink to={"/blacklists/import"}> / Импорт</NavLink>
                <NavLink to={"/blacklists/export"}> / Экспорт</NavLink>
            </nav>
        </div>

        {
            stats ? <div className={"blacklists_stats_graphs"}>
                <h2>Статистика</h2>
                <div className={"graph-container"}>
                    <h3>График по дням</h3>
                    <LineChart width={1350}
                               height={300}
                               series={[
                                   {
                                       data: stats.ByDate.IPs,
                                       label: 'IP адреса',
                                       id: 'ipId',
                                       area: true,
                                       stack: 'total',
                                       color: "#79C99E"
                                   },
                                   {
                                       data: stats.ByDate.Domains,
                                       label: 'Домены',
                                       id: 'domainId',
                                       area: true,
                                       stack: 'total',
                                       color: "#5386E4"
                                   },
                                   {
                                       data: stats.ByDate.URLs,
                                       label: 'Ссылки',
                                       id: 'urlId',
                                       area: true,
                                       stack: 'total',
                                       color: "#E49273"
                                   },
                               ]}
                               xAxis={[{
                                   data: stats.ByDate.Dates,
                                   scaleType: 'band',
                               }]}
                    />
                </div>
                <div className={"graph-container"}>
                    <h3>Глобальное распределение</h3>
                    <PieChart width={600}
                              height={400}

                              series={[
                                  {
                                      innerRadius: 70,
                                      outerRadius: 150,
                                      cornerRadius: 5,
                                      paddingAngle: 3,
                                      highlightScope: {faded: 'global', highlighted: 'item'},
                                      data: [
                                          {
                                              id: 0,
                                              value: stats.TotalIPs,
                                              label: `IP адреса (${stats.TotalIPs})`,
                                              color: "#79C99E"
                                          },
                                          {
                                              id: 1,
                                              value: stats.TotalDomains,
                                              label: `Домены (${stats.TotalDomains})`,
                                              color: "#5386E4"
                                          },
                                          {
                                              id: 2,
                                              value: stats.TotalURLs,
                                              label: `Ссылки (${stats.TotalURLs})`,
                                              color: "#E49273"
                                          },
                                      ],
                                  },
                              ]}
                    />
                </div>

            </div> : <Fragment/>
        }

    </div>
}
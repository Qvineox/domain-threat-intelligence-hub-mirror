import {NavLink} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {IBlacklistStatistics} from "@/entities/blacklists/statistics.ts";
import BlacklistService from "@/services/blacklistService.ts";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import {BarChart, LineChart, pieArcLabelClasses, PieChart} from "@mui/x-charts";


export default function BlacklistsStats() {
    const [stats, setStats] = useState<IBlacklistStatistics>()

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Статистика блокировок`

        BlacklistService.getStatistics().then((response) => {
            if (response.data) {
                setStats(response.data)
            }


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
                <NavLink to={"/blacklists/imports"}> / События</NavLink>
                <NavLink to={"/blacklists/import"}> / Импорт</NavLink>
                <NavLink to={"/blacklists/export"}> / Экспорт</NavLink>
            </nav>
        </div>
        {
            stats ? <div className={"blacklists_stats_graphs"}>
                <h2>Статистика</h2>
                <div className={"blacklists_stats_graphs_discovered"}>
                    <div className={"graph-container"}>
                        <h3>График обнаружения</h3>
                        {
                            stats.CreatedByDate.Dates.length > 0 ? <BarChart height={300}
                                                                             series={[
                                                                                 {
                                                                                     data: stats.DiscoveredByDate.IPs,
                                                                                     label: 'IP адреса',
                                                                                     id: 'ipId',
                                                                                     stack: 'total',
                                                                                     color: "#79C99E"
                                                                                 },
                                                                                 {
                                                                                     data: stats.DiscoveredByDate.Domains,
                                                                                     label: 'Домены',
                                                                                     id: 'domainId',
                                                                                     stack: 'total',
                                                                                     color: "#5386E4"
                                                                                 },
                                                                                 {
                                                                                     data: stats.DiscoveredByDate.URLs,
                                                                                     label: 'Ссылки',
                                                                                     id: 'urlId',
                                                                                     stack: 'total',
                                                                                     color: "#E49273"
                                                                                 },
                                                                                 {
                                                                                     data: stats.DiscoveredByDate.Emails,
                                                                                     label: 'Почтовые адреса',
                                                                                     id: 'emailId',
                                                                                     dataKey: "",
                                                                                     stack: 'total',
                                                                                     color: "#f187bd"
                                                                                 },
                                                                             ]}
                                                                             xAxis={[{
                                                                                 data: stats.DiscoveredByDate.Dates,
                                                                                 scaleType: 'band',
                                                                                 label: "Дата обнражения",
                                                                             }]}
                            /> : <Fragment/>
                        }

                    </div>
                </div>
                <div className={"blacklists_stats_graphs_created"}>
                    <div className={"graph-container"}>
                        <h3>График добавления</h3>
                        {
                            stats.CreatedByDate.Dates.length > 0 ?
                                <LineChart height={300}
                                           series={[
                                               {
                                                   data: stats.CreatedByDate.IPs,
                                                   label: 'IP адреса',
                                                   id: 'createdIPId',
                                                   curve: 'catmullRom',
                                                   area: true,
                                                   stack: 'total',
                                                   color: "#79C99E"
                                               },
                                               {
                                                   data: stats.CreatedByDate.Domains,
                                                   label: 'Домены',
                                                   id: 'domainId',
                                                   curve: 'catmullRom',
                                                   area: true,
                                                   stack: 'total',
                                                   color: "#5386E4"
                                               },
                                               {
                                                   data: stats.CreatedByDate.URLs,
                                                   label: 'Ссылки',
                                                   id: 'createdURLId',
                                                   curve: 'catmullRom',
                                                   area: true,
                                                   stack: 'total',
                                                   color: "#E49273"
                                               },
                                               {
                                                   data: stats.CreatedByDate.Emails,
                                                   label: 'Почтовые адреса',
                                                   id: 'createdEmailId',
                                                   curve: 'catmullRom',
                                                   area: true,
                                                   stack: 'total',
                                                   color: "#f187bd"
                                               },
                                           ]}
                                           xAxis={[{
                                               data: stats.CreatedByDate.Dates,
                                               scaleType: 'band',
                                           }]}
                                /> : <Fragment/>
                        }
                    </div>
                    <div className={"graph-container"}>
                        <h3>Глобальное распределение</h3>
                        {
                            stats ? <PieChart height={300}
                                              sx={{
                                                  [`& .${pieArcLabelClasses.root}`]: {
                                                      fill: 'white',
                                                      fontSize: 14,
                                                  },
                                              }}
                                              series={[
                                                  {
                                                      innerRadius: 50,
                                                      outerRadius: 120,
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
                                                          {
                                                              id: 3,
                                                              value: stats.TotalEmails,
                                                              label: `Почтовые адреса (${stats.TotalEmails})`,
                                                              color: "#f187bd"
                                                          },
                                                      ],
                                                  },
                                              ]}
                            /> : <Fragment/>
                        }
                    </div>
                </div>


            </div> : <Fragment/>
        }

    </div>
}
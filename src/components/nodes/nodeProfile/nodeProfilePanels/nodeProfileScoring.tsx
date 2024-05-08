import {Gauge} from '@mui/x-charts/Gauge';
import {INetworkNodeScoring, ScoreTag} from "@/entities/nodes/networkNode.ts";
import {Button, CircularProgress} from '@mui/material';
import NodesService from "@/services/nodesService.ts";
import {toast} from "react-toastify";
import {Fragment, useState} from "react";

export function NodeProfileScoringPanel(props: INetworkNodeScoring) {
    let verdict: string
    let verdictColor: string

    switch (props.Tag) {
        case ScoreTag.DOMAIN_SCORE_BENIGN:
            verdict = 'Безопасный'
            verdictColor = '#55bd55'
            break
        case ScoreTag.DOMAIN_SCORE_DUBIOUS:
            verdict = 'Сомнительный'
            verdictColor = '#fcaf53'
            break
        case ScoreTag.DOMAIN_SCORE_SUSPICIOUS:
            verdict = 'Подозрительный'
            verdictColor = '#fcaf53'
            break
        case ScoreTag.DOMAIN_SCORE_MALICIOUS:
            verdict = 'Вредоносный'
            verdictColor = '#d33939'
            break

    }

    return <div className={'panel panel__scoring'}>
        <Gauge width={100}
               height={100}
               value={60}
               startAngle={-90}
               endAngle={90}
               title={verdict}
               cornerRadius="50%"/>
        <h2 style={{color: verdictColor}} className={'verdict'}>{verdict}</h2>
        <table className={'ml-scores'}>
            <tbody>
            <tr>
                <td>DGA</td>
                <td style={{textAlign: 'end'}}>{props.DGAScore ?? '???'}</td>
            </tr>
            <tr>
                <td>DNS</td>
                <td style={{textAlign: 'end'}}>{props.DNSScore ?? '???'}</td>
            </tr>
            <tr>
                <td>Composite</td>
                <td style={{textAlign: 'end'}}>{props.FinalScore ?? '???'}</td>
            </tr>
            </tbody>
        </table>
    </div>
}

interface NodeProfileMissingScoringPanel {
    uuid: string
    setNodeScoring: (score: INetworkNodeScoring) => void
}

export function NodeProfileMissingScoringPanel(props: NodeProfileMissingScoringPanel) {
    const [isLoading, setIsLoading] = useState(false);


    const onEvalClick = () => {
        setIsLoading(true)

        NodesService.evaluateNodeScoringByUUID(props.uuid).then((response) => {
            if (response.data) {
                props.setNodeScoring(response.data)
            }
        }).catch((response) => {
            console.error(response)
            toast.error("Ошибка получения оценки!")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return <div className={'panel panel__scoring'}>
        {
            isLoading ? <div className={'loading'}>
                <CircularProgress color="info"/>
            </div> : <Fragment>
                <h3>Оценка узла отсутствует</h3>
                <Button onClick={onEvalClick}>
                    Получить оценку
                </Button>
            </Fragment>
        }
    </div>
}
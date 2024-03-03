import {IJobTarget, TargetType} from "@/entities/queue/dialerJob.ts";
import {Fragment} from "react";

interface ITargetsPreviewProps {
    targets: Array<IJobTarget>
}

export default function TargetsPreview(props: ITargetsPreviewProps) {
    let ips: Array<IJobTarget> = []
    let domains: Array<IJobTarget> = []
    let urls: Array<IJobTarget> = []
    let emails: Array<IJobTarget> = []

    props.targets.forEach((value) => {
        switch (value.Type) {
            case TargetType.HOST_TYPE_CIDR:
                if (!value.Host.includes("/")) {
                    value.Host += "/32"
                }

                ips.push(value)
                break
            case TargetType.HOST_TYPE_URL:
                urls.push(value)
                break
            case TargetType.HOST_TYPE_DOMAIN:
                domains.push(value)
                break
            case TargetType.HOST_TYPE_EMAIL:
                emails.push(value)
                break
        }
    })

    const total = ips.length + domains.length + urls.length + emails.length

    return <div className={'targets-input_preview'}>
        <p>/ выбрано {total} целей</p>
        {
            ips.length > 0 ? <Fragment>
                <p className={'targets-input_preview__ip'}>
                    {` / IP адреса и сети: ${ips.length}`}
                </p>
                <ul className={'hosts'}>
                    {ips.map((value, index) => {
                        return <li key={index}>{value.Host}</li>
                    })}
                </ul>
            </Fragment> : <Fragment/>
        }
        {
            domains.length > 0 ? <Fragment>
                <p className={'targets-input_preview__domain'}>
                    {` / домены: ${domains.length}`}
                </p>
                <ul className={'hosts'}>
                    {domains.map((value, index) => {
                        return <li key={index}>{value.Host}</li>
                    })}
                </ul>
            </Fragment> : <Fragment/>
        }
        {
            urls.length > 0 ? <Fragment>
                <p className={'targets-input_preview__url'}>
                    {` / ссылки: ${urls.length}`}
                </p>
                <ul className={'hosts'}>
                    {urls.map((value, index) => {
                        return <li key={index}>{value.Host}</li>
                    })}
                </ul>
            </Fragment> : <Fragment/>
        }
        {
            emails.length > 0 ? <Fragment>
                <p className={'targets-input_preview__email'}>
                    {` / почтовые адреса: ${emails.length}`}
                </p>
                <ul className={'hosts'}>
                    {emails.map((value, index) => {
                        return <li key={index}>{value.Host}</li>
                    })}
                </ul>
            </Fragment> : <Fragment/>
        }
    </div>
}
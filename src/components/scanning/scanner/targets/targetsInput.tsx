import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {IJobTarget, TargetType} from "@/entities/queue/dialerJob.ts";
import {Popover, TextareaAutosize, Tooltip} from "@mui/material";
import TargetsPreview from "@/components/scanning/scanner/targets/targetsPreview.tsx";
import {useSearchParams} from "react-router-dom";

export interface ITargetsInputProps {
    onChange: Dispatch<SetStateAction<IJobTarget[]>>
    targets: Array<IJobTarget>
}

const helperText: string = "Цели необходимо указавать через знак ';'.\n" +
    "1. Принимаются только IPv4 адреса и сети в формате CIDR (например, '10.10.10.10' равно '10.10.10.10/32'). " +
    "Используя цель в формате CIDR будет просканирован каждый адрес подсети.\n" +
    "2. Домены могут принимать любые значения.\n"+
    "3. Ссылки должны обязательно иметь схему подключения (например, начинаться с 'http://...' или '//..', если схема не указана).\n" +
    "4. Почтовые адресы обязательно должны включать символ '@' (например, 'test@test.com')."

export default function TargetsInput(props: ITargetsInputProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [targetsString, setTargetsString] = useState<string>("")

    const [showHelper, setShowHelper] = useState<boolean>(false)

    useEffect(() => {
        const t = searchParams.get("targets")
        if (t != null && t.length > 0) {
            setTargetsString(t)
        }
    }, [])

    useEffect(() => {
        props.onChange(findTargets(targetsString))
    }, [targetsString]);

    const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
        let v = evt.target.value

        if (v.length > 0) {
            v = v.replace(",", ";")
            v = v.replace("\n", ";")
        }

        setTargetsString(v)

        let params: URLSearchParams = new URLSearchParams()
        params.set("targets", v)

        setSearchParams(params)
    }

    const handleBlur = () => {
        let v = targetsString

        if (v.length > 0) {
            v = v.split(";").map((value) => {
                return value.trim()
            }).join("; ")
        }

        setTargetsString(v)

        let params: URLSearchParams = new URLSearchParams()
        params.set("targets", v)

        setSearchParams(params)
    }

    return <div className={'targets-input'}>
        <TextareaAutosize value={targetsString}
                          className={'targets-input_textarea'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          minRows={3}
                          maxRows={6}
                          placeholder="Цели не выбраны"/>

        <Tooltip className={'hint-tooltip'}
                 title={<div style={{whiteSpace: 'pre-line'}}>{helperText}</div>}
                 placement="bottom-end">
            <p>помощь</p>
        </Tooltip>
        <TargetsPreview targets={props.targets}/>
    </div>
}

const cidrRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;


const findTargets = (input: string): Array<IJobTarget> => {
    let targets: Array<IJobTarget> = []

    let hosts = input.split(";")

    hosts.forEach((value) => {
        let h = value.trim()

        if (h.includes("//")) {
            targets.push({
                Host: h,
                Type: TargetType.HOST_TYPE_URL
            })
        } else if (cidrRegex.test(h)) {
            targets.push({
                Host: h,
                Type: TargetType.HOST_TYPE_CIDR
            })
        } else if (h.includes("@")) {
            targets.push({
                Host: h,
                Type: TargetType.HOST_TYPE_EMAIL
            })
        } else if (h.includes(".")) {
            targets.push({
                Host: h,
                Type: TargetType.HOST_TYPE_DOMAIN
            })
        }
    })

    return targets
}
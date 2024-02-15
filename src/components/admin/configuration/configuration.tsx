import {Button, FormControlLabel, Switch, TextField} from "@mui/material";

export default function Configuration() {
    return <div className={"configuration"}>
        <div className="configuration_config-block">
            <h2>Настройка SMTP</h2>
            <FormControlLabel control={<Switch defaultChecked/>} label="Активен"/>
            <hr/>
            <TextField label={'Адрес сервера'} variant={'filled'} size={'small'} fullWidth/>
        </div>
        <div className="configuration_config-block">
            <h2>Настройка интеграции Naumen</h2>
            <FormControlLabel control={<Switch defaultChecked/>} label="Активен"/>
            <hr/>
            <TextField label={'Адрес сервера'} sx={{marginBottom: '20px'}} variant={'filled'} size={'small'} fullWidth/>

            <TextField label={'ID клиента'} variant={'filled'} size={'small'} fullWidth/>
            <TextField label={'ID группы клиента'} variant={'filled'} size={'small'} fullWidth/>
            <TextField label={'API ключ клиента'} sx={{marginBottom: '20px'}} type={'password'} variant={'filled'}
                       size={'small'} fullWidth/>

            <TextField label={'ID согласования'} type={'password'} variant={'filled'} size={'small'} fullWidth/>
            <TextField label={'SLM'} variant={'filled'} size={'small'} fullWidth/>
            <TextField label={'Тип вызова (CallType)'} variant={'filled'} size={'small'} fullWidth/>
            <TextField label={'Типы хостов'} placeholder={"ids, domains, urls, domains"} variant={'filled'}
                       size={'small'} fullWidth/>
        </div>
        <Button className={'save-configuration'} variant={'outlined'}>
            Сохранить
        </Button>
    </div>
}
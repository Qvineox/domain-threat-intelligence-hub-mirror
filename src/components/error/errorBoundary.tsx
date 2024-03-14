import {useNavigate, useRouteError} from "react-router-dom";
import "@/styles/error.scss"
import {Button} from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export default function ErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate()

    console.error(error);

    return <div className={'error-page'}>
        <h2>Произошла ошибка</h2>
        {
            error ? <p>{`${error}`}</p> : <p>Описание ошибки отсутствует.</p>
        }
        <Button endIcon={<HomeOutlinedIcon/>} variant={'outlined'} color={'info'} onClick={() => {
            navigate("/home")
        }}>
            Вернуться на главную
        </Button>
    </div>
}